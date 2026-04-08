import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export const LoginScreen = ({ navigation }) => {
    const { login } = useAuth();

    const handleLogin = (role) => {
        login(role);

        // Navigate based on role
        if (role === 'author') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'AuthorStack' }],
            });
        } else if (role === 'reader') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'ReaderStack' }],
            });
        } else if (role === 'editor') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'EditorStack' }],
            });
        } else if (role === 'admin') {
            navigation.reset({
                index: 0,
                routes: [{ name: 'AdminStack' }],
            });
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="🔐 Login"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>📰</Text>
                    <Text style={styles.appName}>Portal de Notícias</Text>
                    <Text style={styles.subtitle}>Selecione seu perfil para entrar</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.instructions}>
                        Para fins de simul, selecione um dos perfis abaixo para acessar o ambiente autenticado:
                    </Text>

                    {/* Author Button */}
                    <View style={styles.roleCard}>
                        <Text style={styles.roleIcon}>✍️</Text>
                        <Text style={styles.roleName}>Autor</Text>
                        <Text style={styles.roleDescription}>Criar e gerenciar suas notícias</Text>
                        <CustomButton
                            title="Entrar como Autor"
                            onPress={() => handleLogin('author')}
                            style={styles.roleButton}
                        />
                    </View>

                    {/* Reader Button */}
                    <View style={styles.roleCard}>
                        <Text style={styles.roleIcon}>👁️</Text>
                        <Text style={styles.roleName}>Leitor</Text>
                        <Text style={styles.roleDescription}>Ler e comentar notícias</Text>
                        <CustomButton
                            title="Entrar como Leitor"
                            onPress={() => handleLogin('reader')}
                            style={styles.roleButton}
                        />
                    </View>

                    {/* Editor Button */}
                    <View style={styles.roleCard}>
                        <Text style={styles.roleIcon}>📋</Text>
                        <Text style={styles.roleName}>Editor</Text>
                        <Text style={styles.roleDescription}>Publicar e editar notícias</Text>
                        <CustomButton
                            title="Entrar como Editor"
                            onPress={() => handleLogin('editor')}
                            style={styles.roleButton}
                        />
                    </View>

                    {/* Admin Button */}
                    <View style={styles.roleCard}>
                        <Text style={styles.roleIcon}>👑</Text>
                        <Text style={styles.roleName}>Super Admin</Text>
                        <Text style={styles.roleDescription}>Gerenciar todo o sistema</Text>
                        <CustomButton
                            title="Entrar como Super Admin"
                            onPress={() => handleLogin('admin')}
                            style={styles.roleButton}
                        />
                    </View>

                    {/* Back Button */}
                    <CustomButton
                        title="Voltar"
                        onPress={() => navigation.goBack()}
                        variant="secondary"
                        style={styles.backButton}
                    />
                </View>
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
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        fontSize: 60,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    formContainer: {
        padding: 16,
    },
    instructions: {
        fontSize: 13,
        color: '#666',
        marginBottom: 20,
        lineHeight: 18,
        backgroundColor: '#e3f2fd',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    roleCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    roleIcon: {
        fontSize: 40,
        marginBottom: 8,
    },
    roleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    roleDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 12,
    },
    roleButton: {
        marginVertical: 0,
        width: '100%',
    },
    backButton: {
        marginVertical: 8,
    },
});
