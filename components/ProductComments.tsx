// components/ProductComments.tsx
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Comment } from '../types/comment';

interface ProductCommentsProps {
  productId: string;
}

export default function ProductComments({ productId }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      text: newComment,
      rating,
      createdAt: new Date(),
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-8 max-w-2xl">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="block w-32 p-2 border rounded"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="Share your thoughts about this product..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <div className="mb-6 p-3 bg-yellow-50 text-yellow-700 rounded">
          Please sign in to leave a review.
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="font-medium">{comment.userName}</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < comment.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
}