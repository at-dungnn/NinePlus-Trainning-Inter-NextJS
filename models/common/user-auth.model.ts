export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserAuthenticate {
    avatarUrl: string;
    email: string;
    employeeNo: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    role: string;
    token?: string;
}

export interface SessionService {
    loggedInUser: UserAuthenticate | null;
    isLoggedIn: boolean;
    clearSession?: () => void;
    saveSession: (userAuth: UserAuthenticate) => void;
}
