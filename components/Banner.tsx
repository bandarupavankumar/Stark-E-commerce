import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const banners = [
  {
    id: 1,
    image: '/one.jpg',
    alt: 'Beauty Products',
    title: 'Under ₹499',
    subtitle: 'The Beauty Sale',
    buttonText: 'See all offers',
    position: 'left-1/4',
    textPosition: 'left-1/4',
  },
  {
    id: 2,
    image: '/two.jpg',
    alt: 'Fashion Deals',
    title: 'Up to 60% off',
    subtitle: 'Shoes & Handbags',
    buttonText: 'Explore more',
    position: 'left-1/3',
    textPosition: 'left-1/3',
  },
  {
    id: 3,
    image: '/three.jpg',
    alt: 'Electronics',
    title: 'Up to 70% off',
    subtitle: 'On Headphones',
    buttonText: 'Shop now',
    position: 'left-1/4',
    textPosition: 'left-1/4',
  },
  {
    id: 4,
    image: '/four.jpg',
    alt: 'Home and Kitchen',
    title: 'Up to 50% off',
    subtitle: 'Home & Kitchen Essentials',
    buttonText: 'Shop now',
    position: 'left-1/3',
    textPosition: 'left-1/3',
  },
];

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] w-full bg-gray-100">
      {/* Banner Image */}
      <div className="w-full h-full overflow-hidden">
        <div 
          className="w-full h-full transition-transform duration-1000 ease-in-out flex"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                className="object-cover"
                priority
              />
              {/* Text Overlay */}
              <div className={`absolute ${banner.position} top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-white p-6 bg-gradient-to-r from-black/70 to-transparent rounded-r-lg`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-400">{banner.title}</h2>
                <p className="text-xl md:text-2xl mb-6 font-medium">{banner.subtitle}</p>
                <button 
                  className="bg-gradient-to-b from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-black 
                  font-bold py-2 px-8 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200
                  border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  {banner.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-yellow-400 w-6' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
