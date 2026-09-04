export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest{
    full_name: string;
    email: string;
    password: string;
    // role?: string;
}
    
export interface User {
    id: number;
    full_name: string;
    email: string;
    role: string;
}

export interface loginResponse_v1 {
    success: boolean;
    message: string;
    data: User & {
        jwt: string;
    };
}

export type LoginResponseTest = loginResponse_v1;

export interface LoginResponse_v0 {
    success: boolean;
    message: string;
    data: {
        user: Pick<User, 'full_name'>;
        jwt: string;
    };
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: User;
}

export interface ErrorResponse {
    success: false; 
    message: string; 
    statusCode?: number; 
    errorCode?: string; 
    validationErrors?: Record<string, string[]>; 
}