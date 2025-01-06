// NextJS
import { redirect } from "next/navigation";

// Context
import { useAuth } from "@contexts/AuthContext";

// Components
import Unauthorized from "@components/Unauthorized";

// Constants
import { UserRole } from "@constants/roles";

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    options: {
        requiredRoles?: UserRole[];
        redirectUrl?: string;
    }
) {
    return function WithAuthComponent(props: P) {
        // Props
        const { requiredRoles } = options;

        // Auth
        const { isAuthenticated, user } = useAuth();

        if (!isAuthenticated) redirect("/");

        if (requiredRoles && user && !requiredRoles.includes(user.role)) return <Unauthorized />;

        return <WrappedComponent {...props} />;
    };
}
