import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';

export const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não correspondem!');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Você pode fazer login agora.');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header
                title="📝 Cadastro"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Criar sua conta</Text>
                    <Text style={styles.subtitle}>
                        Preencha os campos abaixo para se cadastrar
                    </Text>

                    {/* Name Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="João Silva"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="seu@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmar Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            ℹ️ Após o cadastro, você poderá escolher seu perfil (Autor, Leitor ou Editor) ao fazer login.
                        </Text>
                    </View>

                    {/* Register Button */}
                    <CustomButton
                        title="Criar Conta"
                        onPress={handleRegister}
                        style={styles.registerButton}
                    />

                    {/* Login Link */}
                    <View style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>Já tem conta? </Text>
                        <CustomButton
                            title="Faça login aqui"
                            onPress={() => navigation.navigate('Login')}
                            variant="secondary"
                            style={styles.loginButton}
                        />
                    </View>
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
    formContainer: {
        padding: 16,
        paddingTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        backgroundColor: '#fff',
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#e3f2fd',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        borderRadius: 6,
        padding: 12,
        marginVertical: 20,
    },
    infoText: {
        fontSize: 12,
        color: '#1976d2',
        lineHeight: 16,
    },
    registerButton: {
        marginVertical: 8,
    },
    loginLink: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
    },
    loginLinkText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    loginButton: {
        marginVertical: 0,
        width: '100%',
    },
});
