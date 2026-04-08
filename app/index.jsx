import { useAuth } from '@/src/context/AuthContext';
import { Redirect } from 'expo-router';

export default function Index() {
    const { userRole } = useAuth();

    // Redireciona baseado no role
    if (!userRole) {
        return <Redirect href="/(public)/" />;
    }

    if (userRole === 'author') {
        return <Redirect href="/(author)/" />;
    }

    if (userRole === 'reader') {
        return <Redirect href="/(reader)/" />;
    }

    if (userRole === 'editor') {
        return <Redirect href="/(editor)/" />;
    }

    if (userRole === 'admin') {
        return <Redirect href="/(admin)/" />;
    }

    return <Redirect href="/(public)/" />;
}
