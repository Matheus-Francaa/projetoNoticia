import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AuthContextType, UserRole, User } from '@/src/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((role: Exclude<UserRole, null>) => {
        const newUser: User = {
            id: Math.random().toString(36).substring(7),
            role,
            name: role.charAt(0).toUpperCase() + role.slice(1),
        };
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value: AuthContextType = {
        userRole: user?.role ?? null,
        user,
        isAuthenticated: user !== null,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
