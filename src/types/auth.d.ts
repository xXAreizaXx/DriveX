interface User {
    email: string;
    id: string;
    role: UserRole;
}

interface AuthError {
    message: string;
    code?: string;
}

interface IAuthContext {
    clearError: () => void;
    error: AuthError | null;
    hasPermission: (permission: string) => boolean;
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
    signIn: (userData: User) => Promise<void>;
    user: User | null;
}