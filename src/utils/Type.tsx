type User = {
    id: string;
    name: string;
    username: string;
    password: string;
    dayOfBirth: number;
    address: string;
    phone: string;
    role: string;
    email: string
}

type Product = {
    id: string;
    name: string;
    tag: string;
    price: number;
    categoryID: string;
    status: boolean
}

export type {
    User,
    Product
}