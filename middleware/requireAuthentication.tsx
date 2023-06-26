import { useRouter } from "next/router";

const requireAuthentication = (WrappedComponent: any) => {
    return (props: any) => {
        const router = useRouter();
        const isAuthenticated = false;
        if (!isAuthenticated) {
            router.push("/login");
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default requireAuthentication;
