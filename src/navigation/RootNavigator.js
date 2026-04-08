import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Public screens
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { RecoveryScreen } from '../screens/Auth/RecoveryScreen';
import { RegisterScreen } from '../screens/Auth/RegisterScreen';
import { HomeScreen } from '../screens/Public/HomeScreen';
import { NewsDetailScreen } from '../screens/Public/NewsDetailScreen';

// Author screens
import { AuthorEditNewsScreen } from '../screens/Author/AuthorEditNewsScreen';
import { AuthorHomeScreen } from '../screens/Author/AuthorHomeScreen';
import { AuthorMyNewsScreen } from '../screens/Author/AuthorMyNewsScreen';
import { AuthorNewNewsScreen } from '../screens/Author/AuthorNewNewsScreen';
import { AuthorProfileScreen } from '../screens/Author/AuthorProfileScreen';

// Reader screens
import { ReaderHomeScreen } from '../screens/Reader/ReaderHomeScreen';
import { ReaderProfileScreen } from '../screens/Reader/ReaderProfileScreen';

// Editor screens
import { EditorHomeScreen } from '../screens/Editor/EditorHomeScreen';
import { EditorPanelScreen } from '../screens/Editor/EditorPanelScreen';
import { EditorProfileScreen } from '../screens/Editor/EditorProfileScreen';

// Admin screens
import { AdminHomeScreen } from '../screens/Admin/AdminHomeScreen';

const Stack = createStackNavigator();

export const PublicStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HomePublic" component={HomeScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Recovery" component={RecoveryScreen} />
        </Stack.Navigator>
    );
};

export const AuthorStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AuthorMain" component={AuthorHomeScreen} />
            <Stack.Screen name="AuthorProfile" component={AuthorProfileScreen} />
            <Stack.Screen name="AuthorMyNews" component={AuthorMyNewsScreen} />
            <Stack.Screen name="AuthorNewNews" component={AuthorNewNewsScreen} />
            <Stack.Screen name="AuthorEditNews" component={AuthorEditNewsScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
            <Stack.Screen name="HomePublic" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export const ReaderStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ReaderMain" component={ReaderHomeScreen} />
            <Stack.Screen name="ReaderProfile" component={ReaderProfileScreen} />
            <Stack.Screen name="HomePublic" component={HomeScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        </Stack.Navigator>
    );
};

export const EditorStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="EditorMain" component={EditorHomeScreen} />
            <Stack.Screen name="EditorPanel" component={EditorPanelScreen} />
            <Stack.Screen name="EditorProfile" component={EditorProfileScreen} />
            <Stack.Screen name="HomePublic" component={HomeScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        </Stack.Navigator>
    );
};

export const AdminStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AdminMain" component={AdminHomeScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
        </Stack.Navigator>
    );
};

export const RootNavigator = () => {
    const { userRole } = useAuth();

    return (
        <NavigationContainer>
            {!userRole ? (
                <PublicStackNavigator />
            ) : userRole === 'author' ? (
                <AuthorStackNavigator />
            ) : userRole === 'reader' ? (
                <ReaderStackNavigator />
            ) : userRole === 'editor' ? (
                <EditorStackNavigator />
            ) : userRole === 'admin' ? (
                <AdminStackNavigator />
            ) : (
                <PublicStackNavigator />
            )}
        </NavigationContainer>
    );
};
