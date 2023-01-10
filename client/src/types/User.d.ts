export type User = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    points: number;
    bio: string;
    role_id: number;
    created_at: string;
    updated_at: string;
    role: {
        id: number;
        name: string;
    };
};

export type Role = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};
