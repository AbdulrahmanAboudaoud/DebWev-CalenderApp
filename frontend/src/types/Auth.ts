export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    userId: number;
    name: string;
    email: string;
    role: string;
};
