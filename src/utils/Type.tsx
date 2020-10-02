type User = {
    _id: string;
    name: string;
    username: string;
    password: string;
    avatar: string;
    dayOfBirth: number;
    address: string[] | null | undefined;
    phone: string;
    role: string;
}

export type {
    User
}