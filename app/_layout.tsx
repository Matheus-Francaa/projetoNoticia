import { AuthProvider } from '@/src/context/AuthContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(author)" options={{ headerShown: false }} />
                <Stack.Screen name="(reader)" options={{ headerShown: false }} />
                <Stack.Screen name="(editor)" options={{ headerShown: false }} />
                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}
