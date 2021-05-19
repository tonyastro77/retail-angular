import { Comment } from './comment';

export class Product {
  id: string;
  name: string;
  image: string;
  featured: boolean;
  price: string;
  description: string;
  comments: Comment[];
}
