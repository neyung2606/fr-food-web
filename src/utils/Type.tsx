type Role = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  dayOfBirth: number;
  address: string;
  phone: string;
  role: Role;
  email: string;
  avatar: string;
};

type Product = {
  id: number;
  name: string;
  image: string[];
  price: number;
  description: string;
  quantity: number;
  category: string;
};

type Order = {
  id: number;
  totalMoney: number;
  name_receive: string;
  address_receive: string;
  phone_receive: string;
  orderDetail: {
    quantity: number;
    product: Product;
  }[];
  created_at: Date;
  deleted_at: Date;
  user: User;
};

export type { User, Product, Role, Order };
