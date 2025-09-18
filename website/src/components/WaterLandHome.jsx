import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import HeroBanner from './HeroBanner';
import FeaturesSection from './FeaturesSection';
import ServicesSection from './ServicesSection';
import PackagesSection from './PackagesSection';
import Footer from './Footer';

const WaterLandHome = () => {
  return (
    <div className="waterland-home">
      <Header />
      <HeroBanner />
      <FeaturesSection />
      <ServicesSection />
      <PackagesSection />
      <Footer />
    </div>
  );
};

export default WaterLandHome;
