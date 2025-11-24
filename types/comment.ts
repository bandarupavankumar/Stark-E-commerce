export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  text: string;
  rating: number;
  createdAt: Date;
}