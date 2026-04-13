import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface UserManagement {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'author' | 'editor' | 'reader';
    createdAt: string;
}

interface UserContextType {
    users: UserManagement[];
    addUser: (user: Omit<UserManagement, 'id' | 'createdAt'>) => void;
    updateUser: (id: string, updates: Partial<UserManagement>) => void;
    deleteUser: (id: string) => void;
    getUsersByRole: (role: string) => UserManagement[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

const initialUsers: UserManagement[] = [
    { id: '1', name: 'João Silva', email: 'joao@exemplo.com', role: 'author', createdAt: '2024-01-01' },
    { id: '2', name: 'Maria Santos', email: 'maria@exemplo.com', role: 'author', createdAt: '2024-01-02' },
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@exemplo.com', role: 'editor', createdAt: '2024-01-03' },
];

export function UserProvider({ children }: UserProviderProps) {
    const [users, setUsers] = useState<UserManagement[]>(initialUsers);

    const addUser = useCallback((user: Omit<UserManagement, 'id' | 'createdAt'>) => {
        const id = Date.now().toString();
        const newUser: UserManagement = {
            ...user,
            id,
            createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers((prev) => [...prev, newUser]);
    }, []);

    const updateUser = useCallback((id: string, updates: Partial<UserManagement>) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
        );
    }, []);

    const deleteUser = useCallback((id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }, []);

    const getUsersByRole = useCallback(
        (role: string) => users.filter((u) => u.role === role),
        [users]
    );

    return (
        <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUsersByRole }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUsers() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
}