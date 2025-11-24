// pages/products/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { Header } from '../../components/Header';
import ProductComments from '../../components/ProductComments';
interface ProductType {
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
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link href="/" className="mt-4 inline-block text-yellow-600 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header onSearch={() => {}} />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <Link href="/" className="text-yellow-600 hover:underline">
              &larr; Back to products
            </Link>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="md:flex">
              <div className="md:w-1/2 p-4">
                <div className="product-image-container bg-white p-4 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image-zoom"
                  />
                </div>
              </div>
              
              <div className="md:w-1/2 p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 ${
                          rating < Math.round(product.rating.rate)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
                
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <p className="text-green-600 text-sm mt-1">In Stock</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Description</h3>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-xl"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-xl"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                          quantity,
                        });
                      }}
                      className="flex-1 bg-yellow-400 border border-yellow-500 rounded-md py-2 px-8 text-sm font-medium text-gray-900 hover:bg-yellow-500"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="mt-12">
        <ProductComments productId={id as string} />
      </div>
        
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="p-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className="h-5 w-5 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">2 days ago</span>
                  </div>
                  <h4 className="font-medium text-gray-900">Great Product!</h4>
                  <p className="text-gray-600 mt-1">
                    {product.description.substring(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">By John D.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}