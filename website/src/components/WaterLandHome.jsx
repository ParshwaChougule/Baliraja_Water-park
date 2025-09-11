import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import HeroBanner from './HeroBanner';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';
import AttractionsSection from './AttractionsSection';
import PackagesSection from './PackagesSection';
import Footer from './Footer';

const WaterLandHome = () => {
  return (
    <div className="waterland-home">
      <Header />
      <HeroBanner />
      <FeaturesSection />
      <ServicesSection />
      <AttractionsSection />
      <PackagesSection />
      <Footer />
    </div>
  );
};

export default WaterLandHome;
