import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = (role) => {
        const userData = {
            id: Math.random().toString(),
            name: role === 'author' ? 'João Autor'
                : role === 'reader' ? 'Maria Leitora'
                    : role === 'editor' ? 'Pedro Editor'
                        : 'Admin Sistema',
            email: `${role}@noticia.com`,
            role: role,
            avatar: '👤'
        };
        setUser(userData);
        setUserRole(role);
    };

    const logout = () => {
        setUser(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
