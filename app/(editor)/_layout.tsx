import { Stack } from 'expo-router';

export default function EditorLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="panel" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="news/[id]" />
        </Stack>
    );
}
