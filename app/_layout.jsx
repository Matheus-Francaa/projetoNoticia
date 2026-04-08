import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { Stack } from 'expo-router';

function RootLayoutNav() {
    const { userRole } = useAuth();

    return (
        <Stack>
            {!userRole ? (
                // Public Stack
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(public)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                </Stack.Group>
            ) : userRole === 'author' ? (
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(author)" options={{ headerShown: false }} />
                </Stack.Group>
            ) : userRole === 'reader' ? (
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(reader)" options={{ headerShown: false }} />
                </Stack.Group>
            ) : userRole === 'editor' ? (
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(editor)" options={{ headerShown: false }} />
                </Stack.Group>
            ) : userRole === 'admin' ? (
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                </Stack.Group>
            ) : null}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}
