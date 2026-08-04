export type Financing = "cash" | "loan";

export interface Inputs {
  // Build cost & financing
  buildCost: number;
  financing: Financing;
  interestRatePercent: number; // annual, e.g. 5 means 5%
  loanTermYears: number;

  // Revenue
  pricePerCup: number;
  cupsPerDay: number;
  daysPerWeek: number;

  // Cost of goods
  ingredientCostPerCup: number;
  cardFeePercent: number; // e.g. 1.5 means 1.5% of revenue

  // Business fixed costs
  siteFeePerDay: number;
  insurancePerWeek: number;
  fuelPerDay: number;
  maintenancePerWeek: number;

  // Personal costs
  rentPerWeek: number;
  utilitiesPerWeek: number;
  foodPerWeek: number;
  otherPersonalPerWeek: number;
}

export interface Outputs {
  totalCupsPerWeek: number;

  weeklyRevenue: number;
  weeklyCostOfGoods: number;
  weeklyGrossProfit: number;

  businessFixedCostsWeekly: number;
  monthlyLoanRepayment: number;
  weeklyLoanRepayment: number;
  businessNetProfitPerWeek: number;

  personalCostsWeekly: number;
  leftoverAfterPersonalPerWeek: number;

  marginPerCup: number;
  breakevenCupsPerDayBusiness: number | null; // null = not achievable
  breakevenCupsPerDayCombined: number | null; // null = not achievable
}

/**
 * Standard amortising loan payment.
 * M = P × (r(1+r)^n) / ((1+r)^n - 1), r = monthly rate, n = total months.
 * Falls back to simple division when r = 0 to avoid a 0/0 division.
 */
export function calculateMonthlyLoanPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  const n = Math.round(termYears * 12);
  if (n <= 0) return 0;

  const r = annualRatePercent / 100 / 12;
  if (r === 0) return principal / n;

  const factor = Math.pow(1 + r, n);
  return (principal * (r * factor)) / (factor - 1);
}

export function calculate(inputs: Inputs): Outputs {
  const {
    buildCost,
    financing,
    interestRatePercent,
    loanTermYears,
    pricePerCup,
    cupsPerDay,
    daysPerWeek,
    ingredientCostPerCup,
    cardFeePercent,
    siteFeePerDay,
    insurancePerWeek,
    fuelPerDay,
    maintenancePerWeek,
    rentPerWeek,
    utilitiesPerWeek,
    foodPerWeek,
    otherPersonalPerWeek,
  } = inputs;

  const totalCupsPerWeek = cupsPerDay * daysPerWeek;
  const weeklyRevenue = pricePerCup * totalCupsPerWeek;

  const cardFeeCost = weeklyRevenue * (cardFeePercent / 100);
  const ingredientCostWeekly = ingredientCostPerCup * totalCupsPerWeek;
  const weeklyCostOfGoods = ingredientCostWeekly + cardFeeCost;
  const weeklyGrossProfit = weeklyRevenue - weeklyCostOfGoods;

  const businessFixedCostsWeekly =
    siteFeePerDay * daysPerWeek +
    insurancePerWeek +
    fuelPerDay * daysPerWeek +
    maintenancePerWeek;

  const monthlyLoanRepayment =
    financing === "loan"
      ? calculateMonthlyLoanPayment(buildCost, interestRatePercent, loanTermYears)
      : 0;
  // Monthly -> weekly via ×12/52, not /4.33, to avoid compounding rounding error.
  const weeklyLoanRepayment = financing === "loan" ? (monthlyLoanRepayment * 12) / 52 : 0;

  const businessNetProfitPerWeek =
    weeklyGrossProfit - businessFixedCostsWeekly - weeklyLoanRepayment;

  const personalCostsWeekly =
    rentPerWeek + utilitiesPerWeek + foodPerWeek + otherPersonalPerWeek;
  const leftoverAfterPersonalPerWeek = businessNetProfitPerWeek - personalCostsWeekly;

  const marginPerCup =
    pricePerCup - ingredientCostPerCup - (pricePerCup * cardFeePercent) / 100;

  const requiredBusinessCostWeekly = businessFixedCostsWeekly + weeklyLoanRepayment;
  const requiredCombinedCostWeekly = requiredBusinessCostWeekly + personalCostsWeekly;

  const canBreakeven = marginPerCup > 0 && daysPerWeek > 0;

  const breakevenCupsPerDayBusiness = canBreakeven
    ? Math.ceil(requiredBusinessCostWeekly / (marginPerCup * daysPerWeek))
    : null;
  const breakevenCupsPerDayCombined = canBreakeven
    ? Math.ceil(requiredCombinedCostWeekly / (marginPerCup * daysPerWeek))
    : null;

  return {
    totalCupsPerWeek,
    weeklyRevenue,
    weeklyCostOfGoods,
    weeklyGrossProfit,
    businessFixedCostsWeekly,
    monthlyLoanRepayment,
    weeklyLoanRepayment,
    businessNetProfitPerWeek,
    personalCostsWeekly,
    leftoverAfterPersonalPerWeek,
    marginPerCup,
    breakevenCupsPerDayBusiness,
    breakevenCupsPerDayCombined,
  };
}
