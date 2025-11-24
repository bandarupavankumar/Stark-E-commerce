import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import { formatPrice } from '../utils/format';

type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
}: ProductProps) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
    };
    
    // Sending the product as an action to the REDUX store... the basket slice
    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <div className="flex justify-center">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          objectFit="contain"
          className="cursor-pointer"
        />
      </div>

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <p className="text-lg font-medium text-gray-900">{formatPrice(price)}</p>
      </div>

      <button
        onClick={addItemToBasket}
        className="mt-auto button bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500"
      >
        Add to Basket
      </button>
    </div>
  );
};
