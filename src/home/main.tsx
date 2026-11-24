import { useEffect, useState } from 'react';
import { Particles } from '../components/Particles';
import { mount } from '../components/mount';
import { About } from './About';
import { Faq } from './Faq';
import { Footer, PageUtilities, VenueMap } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { InquiryDialog } from './InquiryDialog';
import { InterestDialog } from './InterestDialog';
import { Sponsors } from './Sponsors';
import { goToSection, openLegacySection } from './sectionNavigation';
import { enableProductionAnalytics } from './productionAnalytics';
import '../styles/style.css';
import '../styles/gallery.css';
import '../styles/touchups.css';
import '../styles/home.css';
import '../styles/home-dialog.css';

function HomePage() {
  const [dialog, setDialog] = useState<'interest' | 'inquiry' | null>(null);
  useEffect(openLegacySection, []);
  const openInterest = () => setDialog('interest');
  const closeDialog = () => setDialog(null);

  return (
    <>
      <button type="button" className="skip-link" onClick={() => goToSection('main-content')}>
        Skip to content
      </button>
      <Particles prominent />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero openInterest={openInterest} openInquiry={() => setDialog('inquiry')} />
        <div className="home-content">
          <About />
          <Sponsors />
          <Faq />
          <VenueMap />
        </div>
      </main>
      <Footer openInterest={openInterest} />
      <PageUtilities />
      <InterestDialog open={dialog === 'interest'} onClose={closeDialog} />
      <InquiryDialog open={dialog === 'inquiry'} onClose={closeDialog} />
    </>
  );
}

mount(<HomePage />);
enableProductionAnalytics();
