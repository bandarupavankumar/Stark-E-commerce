 import { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import { Product } from '../components/Product';
import { useCart } from '../context/CartContext';
import { Cart } from '../components/Cart';
import { Banner } from '../components/Banner';
import { StarIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Header } from '@/components/Header';
import Link from 'next/link';
import Footer from '@/components/Footer';

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function getServerSideProps() {
  // Fetch products from Fake Store API
  const res = await fetch('https://fakestoreapi.com/products?limit=20');
  const products = await res.json();

  return {
    props: {
      initialProducts: products,
    },
  };
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export default function Home({ initialProducts }: { initialProducts: ProductType[] }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing"
  ];

  const fetchProducts = async (category: string) => {
    setLoading(true);
    try {
      const url =
        category === 'all'
          ? 'https://fakestoreapi.com/products?limit=20'
          : `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      applyFilters(data, priceRange, minRating, sortBy);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (
    productsList: ProductType[],
    priceRange: [number, number],
    rating: number,
    sortOption: SortOption,
    searchTerm: string = ''
  ) => {
    let result = [...productsList];
    
    // Apply search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (rating > 0) {
      result = result.filter((product) => product.rating.rate >= rating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }
    
    setFilteredProducts(result);
  };

  // Handle search from header
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(products, priceRange, minRating, sortBy, query);
  };

  // Update filtered products when filters change
  useEffect(() => {
    applyFilters(products, priceRange, minRating, sortBy, searchQuery);
  }, [products, priceRange, minRating, sortBy, searchQuery]);

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    fetchProducts(selectedCategory);
    setShowFilters(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = parseFloat(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Stark</title>
        <meta name="description" content="Amazon Clone - Shop Online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative">
        {/* Banner Carousel */}
        <Header onSearch={handleSearch} />
        {/* Banner */}
        <Banner />
        {/* <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Media/Unrec/Live_PC_Hero_Lifestyle_3000x1200-m-2x._CB780065834_.jpg"
            alt="Amazon Banner"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Filters and Sort Bar */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2">
              <div className="flex items-center space-x-2 overflow-x-auto py-2 md:py-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      category === cat
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4 mt-2 md:mt-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-sm text-gray-700 hover:text-yellow-600"
                >
                  <FunnelIcon className="h-5 w-5 mr-1" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="appearance-none bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 py-4 px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-full md:w-1/3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Customer Review</h3>
                    <div className="flex space-x-1">
                      {[4, 3, 2, 1].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRatingChange(rating)}
                          className={`flex items-center text-sm ${
                            minRating === rating
                              ? 'text-yellow-500'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-5 w-5 ${
                                i < rating ? 'fill-current' : ''
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-500">& Up</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={resetFilters}
                      className="text-sm text-yellow-600 hover:text-yellow-700 flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      Clear all filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <p className="text-sm text-gray-600">
              {filteredProducts.length > 0 
                ? `${filteredProducts.length} results for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </p>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Featured Product (First Product) */}
            {products.length > 0 && (
              <div className="mb-10 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/2 lg:w-2/3">
                    <img
                      className="h-64 w-full object-contain md:h-full md:w-full"
                      src={products[0].image}
                      alt={products[0].title}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-yellow-600 font-semibold">
                      {products[0].category}
                    </div>
                    <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                      {products[0].title}
                    </h2>
                    <p className="mt-3 text-base text-gray-500 line-clamp-3">
                      {products[0].description}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.round(products[0].rating.rate)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-600">
                          {products[0].rating.rate} ({products[0].rating.count} reviews)
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-3xl font-bold text-gray-900">
                          ${products[0].price.toFixed(2)}
                        </p>
                        <button
                          onClick={() =>
                            addToCart({
                              id: products[0].id,
                              title: products[0].title,
                              price: products[0].price,
                              image: products[0].image,
                            })
                          }
                          className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Products Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              
{filteredProducts.map((product) => (
  <Link href={`/products/${product.id}`} key={product.id} passHref>
    <div className="group cursor-pointer">
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700 line-clamp-2">{product.title}</h3>
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-4 w-4 ${
                  rating < Math.round(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.rating.count})</span>
        </div>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  </Link>
))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No products match your filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

      </main>

      {/* Cart Sidebar */}
      <Cart />

      
      <Footer/>
    </div>
  );
}
