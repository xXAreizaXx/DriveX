// ReactJS
import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Constants
import { ROLE_PERMISSIONS, UserRole } from "@constants/roles";

const AuthContext = createContext<IAuthContext>({
    clearError: () => { },
    error: null,
    hasPermission: () => false,
    isAuthenticated: false,
    isInitialized: false,
    isLoading: false,
    logout: async () => { },
    signIn: async () => { },
    user: null,
});

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // States
    const [error, setError] = useState<AuthError | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Functions
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const signIn = async (userData: User) => {
        try {
            setIsLoading(true);
            setError(null);

            const token = btoa(JSON.stringify({ userId: userData.id, timestamp: Date.now() }));

            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(userData));

            setIsAuthenticated(true);
            setUser(userData);

            window.location.href = "/home";
        } catch (err) {
            setError({
                message: err instanceof Error ? err.message : "Failed to sign in",
                code: "SIGN_IN_ERROR"
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            setError(null);

            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);

            setIsAuthenticated(false);
            setUser(null);

            window.location.href = "/";
        } catch (err) {
            setError({
                message: err instanceof Error ? err.message : "Failed to logout",
                code: "LOGOUT_ERROR"
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const hasPermission = useCallback((permission: string): boolean => {
        if (!user) return false;

        const userPermissions = ROLE_PERMISSIONS[user.role as UserRole];
        return Array.isArray(userPermissions) && userPermissions.includes(permission as never);
    }, [user]);

    // Effects
    useEffect(() => {
        const initializeAuth = () => {
            try {
                if (typeof window !== "undefined") {
                    const token = localStorage.getItem(TOKEN_KEY);
                    const savedUser = localStorage.getItem(USER_KEY);

                    if (token && savedUser) {
                        const parsedUser = JSON.parse(savedUser);
                        setUser(parsedUser);
                        setIsAuthenticated(true);
                    }
                }
            } catch (e) {
                console.error("Error initializing auth:", e);
                setError({
                    message: "Failed to initialize authentication",
                    code: "INIT_ERROR"
                });
            } finally {
                setIsLoading(false);
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, []);

    if (!isInitialized) return null;

    return (
        <AuthContext.Provider value={{
            clearError,
            error,
            hasPermission,
            isAuthenticated,
            isLoading,
            isInitialized,
            logout,
            signIn,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
