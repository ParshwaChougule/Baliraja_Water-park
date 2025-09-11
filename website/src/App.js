import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

// Import WaterLand components
import WaterLandHome from './components/WaterLandHome';
import BookingPage from './components/BookingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import AttractionsSection from './components/AttractionsSection';
import PackagesSection from './components/PackagesSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import ServicesSection from './components/ServicesSection';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedBookingRoute from './components/ProtectedBookingRoute';
import WaterActivity from './components/WaterActivity';
import FunActivity from './components/FunActivity';
import GardenActivity from './components/GardenActivity';
import Gallery from './components/Gallery';
import BookingsDisplay from './components/BookingsDisplay';

// Individual page components
const AboutPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">About Baliraja</h1>
            <p className="lead">Learn more about our amazing water park and what makes us special.</p>
          </div>
        </div>
      </div>
    </div>
    <FeaturesSection />
    <Footer />
  </>
);

const ServicesPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Our Services</h1>
            <p className="lead">Discover all the amazing services and facilities we offer.</p>
          </div>
        </div>
      </div>
    </div>
    <ServicesSection />
    <Footer />
  </>
);

const FeaturesPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Our Features</h1>
            <p className="lead">Explore what makes WaterLand the best water park experience.</p>
          </div>
        </div>
      </div>
    </div>
    <FeaturesSection />
    <Footer />
  </>
);

const GalleryPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Photo Gallery</h1>
            <p className="lead">Take a look at the fun and excitement at WaterLand.</p>
          </div>
        </div>
      </div>
    </div>
    <GallerySection />
    <Footer />
  </>
);

const AttractionsPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Water Attractions</h1>
            <p className="lead">Experience thrilling rides and exciting water attractions.</p>
          </div>
        </div>
      </div>
    </div>
    <AttractionsSection />
    <Footer />
  </>
);

const PackagesPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Ticket Packages</h1>
            <p className="lead">Choose the perfect package for your family adventure.</p>
          </div>
        </div>
      </div>
    </div>
    <PackagesSection />
    <Footer />
  </>
);

const TeamPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Our Team</h1>
            <p className="lead">Meet the dedicated professionals who make WaterLand special.</p>
          </div>
        </div>
      </div>
    </div>
    <TeamSection />
    <Footer />
  </>
);

const TestimonialsPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Customer Reviews</h1>
            <p className="lead">Read what our happy visitors have to say about their experience.</p>
          </div>
        </div>
      </div>
    </div>
    <TestimonialsSection />
    <Footer />
  </>
);

const ContactPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
            <p className="lead">Get in touch with us for any questions or bookings.</p>
          </div>
        </div>
      </div>
    </div>
    <ContactSection />
    <Footer />
  </>
);

const BookingsPage = () => (
  <>
    <Header />
    <BookingsDisplay />
    <Footer />
  </>
);

const BlogPage = () => (
  <>
    <Header />
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 fw-bold mb-4">Latest News & Blog</h1>
            <p className="lead">Stay updated with the latest news and articles from WaterLand.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<WaterLandHome />} />
            <Route path="/home" element={<WaterLandHome />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/service" element={<ServicesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/water-activity" element={<WaterActivity />} />
            <Route path="/fun-activity" element={<FunActivity />} />
            <Route path="/garden-activity" element={<GardenActivity />} />
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/testimonial" element={<TestimonialsPage />} />
            <Route path="/contact" element={
              <>
                <Header />
                <ContactSection />
                <Footer />
              </>
            } />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<WaterLandHome />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
