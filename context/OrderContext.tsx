import { createContext, useContext, useState, ReactNode } from 'react';

type OrderType = {
  id: string;
  date: string;
  items: Array<{
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
};

type OrderContextType = {
  orders: OrderType[];
  orderCount: number;
  addOrder: (items: OrderType['items'], total: number) => void;
  getOrder: (orderId: string) => OrderType | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const addOrder = (items: OrderType['items'], total: number) => {
    const newOrder: OrderType = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      total,
      status: 'pending',
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderCount: orders.length,
        addOrder,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
