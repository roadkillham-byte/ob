import { useMemo, useState } from "react";
import type { Financing, Inputs } from "./calculations";
import { calculate } from "./calculations";
import { formatCups, formatCurrency, formatCurrencyCents, formatPercent } from "./format";
import { Slider } from "./components/Slider";

const DEFAULT_INPUTS: Inputs = {
  buildCost: 20000,
  financing: "cash",
  interestRatePercent: 0,
  loanTermYears: 1,

  pricePerCup: 5.5,
  cupsPerDay: 90,
  daysPerWeek: 1,

  ingredientCostPerCup: 0.8,
  cardFeePercent: 0,

  siteFeePerDay: 0,
  insurancePerWeek: 0,
  fuelPerDay: 0,
  maintenancePerWeek: 0,

  rentPerWeek: 0,
  utilitiesPerWeek: 0,
  foodPerWeek: 0,
  otherPersonalPerWeek: 0,
};

const BUILD_PRESETS = [
  { label: "Turnkey quote", value: 90000 },
  { label: "DIY build", value: 40000 },
] as const;

function App() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT_INPUTS);

  // Recomputed from scratch on every render, so every slider change produces
  // a fresh result — nothing here is stale state.
  const outputs = useMemo(() => calculate(inputs), [inputs]);

  const set = <K extends keyof Inputs>(key: K, value: Inputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const isLoan = inputs.financing === "loan";

  return (
    <div className="page">
      <header className="page__header">
        <h1>Coffee Van Cash Flow Calculator</h1>
        <p>
          Adjust the sliders below to model weekly cash flow for a mobile coffee van, from
          build-cost financing through to what's actually left in your pocket.
        </p>
      </header>

      <main>
        {/* 1. Build cost & financing */}
        <section className="card" aria-labelledby="build-cost-heading">
          <h2 id="build-cost-heading">Build cost &amp; financing</h2>

          <div className="preset-row">
            {BUILD_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className="preset-button"
                onClick={() => set("buildCost", preset.value)}
              >
                {preset.label} ({formatCurrency(preset.value)})
              </button>
            ))}
          </div>

          <Slider
            id="buildCost"
            label="Build cost"
            min={20000}
            max={100000}
            step={1000}
            value={inputs.buildCost}
            onChange={(v) => set("buildCost", v)}
            formatValue={formatCurrency}
          />

          <p className="note">
            A DIY cost figure only holds if it covers the complete fit-out — machine, van
            or trailer conversion, plumbing, electrical, signage, permits and fit-out labour —
            not just the line items that are easiest to remember or price. An incomplete DIY
            estimate understates the real build cost.
          </p>

          <div className="field-row">
            <label htmlFor="financing">Financing</label>
            <select
              id="financing"
              value={inputs.financing}
              onChange={(e) => set("financing", e.target.value as Financing)}
            >
              <option value="cash">Paid cash</option>
              <option value="loan">Loan</option>
            </select>
          </div>

          <div className={`loan-fields${isLoan ? "" : " loan-fields--disabled"}`}>
            <Slider
              id="interestRate"
              label="Interest rate (annual)"
              min={0}
              max={15}
              step={0.5}
              value={inputs.interestRatePercent}
              onChange={(v) => set("interestRatePercent", v)}
              formatValue={(v) => formatPercent(v, 1)}
              disabled={!isLoan}
            />
            <Slider
              id="loanTerm"
              label="Loan term"
              min={1}
              max={7}
              step={1}
              value={inputs.loanTermYears}
              onChange={(v) => set("loanTermYears", v)}
              formatValue={(v) => `${v} year${v === 1 ? "" : "s"}`}
              disabled={!isLoan}
            />
            {isLoan && (
              <p className="note">
                Repayment: {formatCurrency(outputs.monthlyLoanRepayment)}/month (
                {formatCurrency(outputs.weeklyLoanRepayment)}/week equivalent)
              </p>
            )}
          </div>
        </section>

        {/* 2. Revenue */}
        <section className="card" aria-labelledby="revenue-heading">
          <h2 id="revenue-heading">Revenue</h2>

          <Slider
            id="pricePerCup"
            label="Price per cup"
            min={4}
            max={8}
            step={0.1}
            value={inputs.pricePerCup}
            onChange={(v) => set("pricePerCup", v)}
            formatValue={formatCurrencyCents}
          />
          <Slider
            id="cupsPerDay"
            label="Cups sold per trading day"
            min={20}
            max={300}
            step={5}
            value={inputs.cupsPerDay}
            onChange={(v) => set("cupsPerDay", v)}
            formatValue={(v) => `${v} cups`}
          />
          <Slider
            id="daysPerWeek"
            label="Trading days per week"
            min={1}
            max={6}
            step={1}
            value={inputs.daysPerWeek}
            onChange={(v) => set("daysPerWeek", v)}
            formatValue={(v) => `${v} day${v === 1 ? "" : "s"}`}
          />

          <p className="subtotal">
            Weekly revenue: <strong>{formatCurrency(outputs.weeklyRevenue)}</strong>
          </p>
        </section>

        {/* 3. Cost of goods */}
        <section className="card" aria-labelledby="cogs-heading">
          <h2 id="cogs-heading">Cost of goods</h2>

          <Slider
            id="ingredientCost"
            label="Ingredient cost per cup"
            min={0.8}
            max={2.5}
            step={0.1}
            value={inputs.ingredientCostPerCup}
            onChange={(v) => set("ingredientCostPerCup", v)}
            formatValue={formatCurrencyCents}
          />
          <Slider
            id="cardFee"
            label="Card / POS fee"
            min={0}
            max={4}
            step={0.1}
            value={inputs.cardFeePercent}
            onChange={(v) => set("cardFeePercent", v)}
            formatValue={(v) => formatPercent(v, 1)}
          />

          <p className="subtotal">
            Weekly gross profit: <strong>{formatCurrency(outputs.weeklyGrossProfit)}</strong>
          </p>
        </section>

        {/* 4. Business fixed costs */}
        <section className="card" aria-labelledby="fixed-costs-heading">
          <h2 id="fixed-costs-heading">Business fixed costs</h2>

          <Slider
            id="siteFee"
            label="Site / stall fee per trading day"
            min={0}
            max={150}
            step={5}
            value={inputs.siteFeePerDay}
            onChange={(v) => set("siteFeePerDay", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="insurance"
            label="Insurance + council fees per week"
            min={0}
            max={150}
            step={5}
            value={inputs.insurancePerWeek}
            onChange={(v) => set("insurancePerWeek", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="fuel"
            label="Fuel / towing per trading day"
            min={0}
            max={80}
            step={5}
            value={inputs.fuelPerDay}
            onChange={(v) => set("fuelPerDay", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="maintenance"
            label="Maintenance / other per week"
            min={0}
            max={200}
            step={10}
            value={inputs.maintenancePerWeek}
            onChange={(v) => set("maintenancePerWeek", v)}
            formatValue={formatCurrency}
          />

          <p className="subtotal">
            Business net profit per week:{" "}
            <strong>{formatCurrency(outputs.businessNetProfitPerWeek)}</strong>
            <span className="subtotal__hint"> — what's left to draw as income, or reinvest</span>
          </p>
        </section>

        {/* 5. Personal costs */}
        <section className="card card--personal" aria-labelledby="personal-costs-heading">
          <h2 id="personal-costs-heading">Personal costs</h2>
          <p className="note">
            These are your own living costs, separate from the business. They default to zero
            because they're not universally applicable — set them only if they're real for you.
          </p>

          <Slider
            id="rent"
            label="Rent per week"
            min={0}
            max={600}
            step={10}
            value={inputs.rentPerWeek}
            onChange={(v) => set("rentPerWeek", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="utilities"
            label="Utilities per week"
            min={0}
            max={150}
            step={5}
            value={inputs.utilitiesPerWeek}
            onChange={(v) => set("utilitiesPerWeek", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="food"
            label="Food per week"
            min={0}
            max={250}
            step={5}
            value={inputs.foodPerWeek}
            onChange={(v) => set("foodPerWeek", v)}
            formatValue={formatCurrency}
          />
          <Slider
            id="otherPersonal"
            label="Other personal per week"
            min={0}
            max={300}
            step={10}
            value={inputs.otherPersonalPerWeek}
            onChange={(v) => set("otherPersonalPerWeek", v)}
            formatValue={formatCurrency}
          />
        </section>
      </main>

      {/* Output block */}
      <footer className="output" aria-labelledby="output-heading">
        <h2 id="output-heading" className="visually-hidden">
          Results
        </h2>
        <div className="output__grid">
          <div className="output__item">
            <span className="output__value">{formatCurrency(outputs.weeklyRevenue)}</span>
            <span className="output__label">Weekly revenue — top-line, before any costs</span>
          </div>
          <div className="output__item">
            <span className="output__value">{formatCurrency(outputs.weeklyGrossProfit)}</span>
            <span className="output__label">
              Weekly gross profit — after cost of goods, before fixed costs
            </span>
          </div>
          <div className="output__item">
            <span className="output__value">
              {formatCurrency(outputs.businessNetProfitPerWeek)}
            </span>
            <span className="output__label">
              Business net profit per week — after all business fixed costs and loan
              repayment; what's left to draw as income, or reinvest
            </span>
          </div>
          <div className="output__item">
            <span className="output__value">
              {formatCurrency(outputs.leftoverAfterPersonalPerWeek)}
            </span>
            <span className="output__label">
              Leftover after personal costs per week — business net minus personal draw total
            </span>
          </div>
          <div className="output__item">
            <span className="output__value">
              {formatCups(outputs.breakevenCupsPerDayBusiness)}
            </span>
            <span className="output__label">Cups/day to cover business costs alone</span>
          </div>
          <div className="output__item">
            <span className="output__value">
              {formatCups(outputs.breakevenCupsPerDayCombined)}
            </span>
            <span className="output__label">
              Cups/day to cover business + personal costs combined
            </span>
          </div>
        </div>

        <p className="caveat">
          These figures are your inputs run through arithmetic — not a market-validated
          estimate of realistic pricing or volume for a coffee van business in your area.
        </p>
      </footer>
    </div>
  );
}

export default App;
