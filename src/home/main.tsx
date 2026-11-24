import { useState } from 'react';
import { mount } from '../components/mount';
import { About } from './About';
import { Faq } from './Faq';
import { Footer, PageUtilities, VenueMap } from './Footer';
import { Header } from './Header';
import { Hero } from './Hero';
import { InquiryDialog } from './InquiryDialog';
import { InterestDialog } from './InterestDialog';
import { Sponsors } from './Sponsors';
import { enableProductionWidgets } from './productionWidgets';
import '../styles/style.css';
import '../styles/gallery.css';
import '../styles/touchups.css';
import '../styles/hacker-interest.css';
import '../styles/home.css';

function HomePage() {
  const [dialog, setDialog] = useState<'interest' | 'inquiry' | null>(null);
  const openInterest = () => setDialog('interest');
  const closeDialog = () => setDialog(null);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero openInterest={openInterest} openInquiry={() => setDialog('inquiry')} />
        <About />
        <Sponsors />
        <Faq />
        <VenueMap />
      </main>
      <Footer openInterest={openInterest} />
      <PageUtilities />
      <InterestDialog open={dialog === 'interest'} onClose={closeDialog} />
      <InquiryDialog open={dialog === 'inquiry'} onClose={closeDialog} />
    </>
  );
}

mount(<HomePage />);
enableProductionWidgets();
