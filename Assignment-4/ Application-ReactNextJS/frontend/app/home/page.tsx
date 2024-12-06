import React from 'react';
import Navbar from '../../components/Navbar'
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Carousel />
        {/* Add more content here */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
