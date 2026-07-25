import { Buy } from '@/components/Buy';
import { Demo } from '@/components/Demo';
import { EmailCapture } from '@/components/EmailCapture';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Includes } from '@/components/Includes';
import { Requirements } from '@/components/Requirements';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-[calc(var(--gutter)+var(--container-column))] px-5 md:px-8">
        <p className="font-display text-syntax pt-8 text-xs md:pl-[var(--gutter)]">
          {site.fileName}
        </p>

        <Hero />
        <Demo />
        <Includes />
        <Requirements />
        <Buy />
        <EmailCapture />
      </main>

      <Footer />
    </>
  );
}
