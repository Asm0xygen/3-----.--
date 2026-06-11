import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { BeforeAfter } from '../components/BeforeAfter';
import { Demo } from '../components/Demo';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Demo />
        <BeforeAfter />
        <CTA />
      </main>
      <Footer />
    </>
  );
};
