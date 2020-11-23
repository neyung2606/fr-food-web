type Role = {
    id: number,
    name: string,
}

type User = {
    id: number;
    name: string;
    username: string;
    password: string;
    dayOfBirth: number;
    address: string;
    phone: string;
    role: Role;
    email: string
    avatar: string
}

type Product = {
    id: string;
    name: string;
    image: string[];
    price: number;
    description: string;
    quantity: number;
    category: string
}

export type {
    User,
    Product
}