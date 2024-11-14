'use client';

import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
    return (
        <SessionProvider>
            {childen}
        </SessionProvider>
    );
}

export default AuthProvider;