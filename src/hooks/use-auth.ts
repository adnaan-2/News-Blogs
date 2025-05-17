import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const useAuth = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [status]);

    const login = async (email: string, password: string) => {
        await signIn('credentials', { email, password });
    };

    const logout = async () => {
        await signOut();
    };

    return {
        session,
        loading,
        login,
        logout,
    };
};

export default useAuth;