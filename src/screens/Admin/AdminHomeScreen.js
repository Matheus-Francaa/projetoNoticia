import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export const AdminHomeScreen = ({ navigation }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        Alert.alert('Confirmar', 'Tem certeza que deseja sair?', [
            { text: 'Cancelar', onPress: () => { } },
            {
                text: 'Sair',
                onPress: () => {
                    logout();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'PublicStack' }],
                    });
                },
            },
        ]);
    };

    const adminMenus = [
        { icon: '🏙️', title: 'CRUD Cidades', desc: 'Gerenciar cidades' },
        { icon: '🏷️', title: 'CRUD Tags', desc: 'Gerenciar tags' },
        { icon: '👥', title: 'CRUD Perfis', desc: 'Gerenciar roles de usuários' },
        { icon: '📍', title: 'CRUD UF', desc: 'Gerenciar estados' },
        { icon: '📰', title: 'CRUD Notícias', desc: 'Gerenciar todas as notícias' },
        { icon: '👤', title: 'CRUD Usuários', desc: 'Gerenciar usuários' },
        { icon: '💬', title: 'Gerenciar Comentários', desc: 'Moderar comentários' },
    ];

    return (
        <View style={styles.container}>
            <Header title="👑 Dashboard Admin" />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.userCard}>
                    <Text style={styles.userIcon}>👑</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                        <Text style={styles.userRole}>Super Admin</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {adminMenus.map((menu, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => alert(`${menu.title} - Gerenciador`)}
                        >
                            <Text style={styles.menuIcon}>{menu.icon}</Text>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>{menu.title}</Text>
                                <Text style={styles.menuDesc}>{menu.desc}</Text>
                            </View>
                            <Text style={styles.menuArrow}>→</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <CustomButton
                    title="🚪 Sair"
                    onPress={handleLogout}
                    variant="secondary"
                    style={styles.logoutButton}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
    },
    userIcon: {
        fontSize: 50,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    userRole: {
        fontSize: 11,
        backgroundColor: '#9C27B0',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    menuContainer: {
        marginBottom: 20,
    },
    menuItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 1,
    },
    menuIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    menuText: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    menuDesc: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    menuArrow: {
        fontSize: 16,
        color: '#ccc',
    },
    logoutButton: {
        marginTop: 20,
    },
});
