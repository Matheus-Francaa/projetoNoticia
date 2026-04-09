import { Stack } from 'expo-router';

export default function AuthorLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="mynews" />
            <Stack.Screen name="newnews" />
            <Stack.Screen name="editnews" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="news/[id]" />
        </Stack>
    );
}
