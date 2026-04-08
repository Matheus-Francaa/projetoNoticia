import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';

export const RecoveryScreen = ({ navigation }) => {
    const [step, setStep] = useState('email'); // email, code, password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendCode = () => {
        if (!email.trim()) {
            Alert.alert('Erro', 'Por favor, informe seu email!');
            return;
        }

        Alert.alert('Sucesso', 'Um código de recuperação foi enviado para seu email!');
        setStep('code');
    };

    const handleVerifyCode = () => {
        if (!code.trim()) {
            Alert.alert('Erro', 'Por favor, informe o código!');
            return;
        }

        // Simulate code verification
        if (code === '123456') {
            Alert.alert('Sucesso', 'Código verificado!');
            setStep('password');
        } else {
            Alert.alert('Erro', 'Código inválido!');
        }
    };

    const handleResetPassword = () => {
        if (!newPassword.trim() || !confirmPassword.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não correspondem!');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
            return;
        }

        Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso!');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Header
                title="🔑 Recuperar Acesso"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Recuperar Acesso</Text>

                    {/* Step 1: Email */}
                    {step === 'email' && (
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepTitle}>Passo 1 de 3</Text>
                            <Text style={styles.subtitle}>
                                Informe o email cadastrado em sua conta para recuperar o acesso
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    placeholderTextColor="#999"
                                    editable={step === 'email'}
                                />
                            </View>

                            <CustomButton
                                title="Enviar Código"
                                onPress={handleSendCode}
                                style={styles.button}
                            />
                        </View>
                    )}

                    {/* Step 2: Code */}
                    {step === 'code' && (
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepTitle}>Passo 2 de 3</Text>
                            <Text style={styles.subtitle}>
                                Um código de verificação foi enviado para {email}
                            </Text>

                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>
                                    💡 Para este demo, use o código: 123456
                                </Text>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Código de Recuperação</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Informe o código"
                                    value={code}
                                    onChangeText={setCode}
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <CustomButton
                                title="Verificar Código"
                                onPress={handleVerifyCode}
                                style={styles.button}
                            />

                            <CustomButton
                                title="Voltar"
                                onPress={() => setStep('email')}
                                variant="secondary"
                                style={styles.button}
                            />
                        </View>
                    )}

                    {/* Step 3: New Password */}
                    {step === 'password' && (
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepTitle}>Passo 3 de 3</Text>
                            <Text style={styles.subtitle}>
                                Digite sua nova senha
                            </Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nova Senha</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mínimo 6 caracteres"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={true}
                                    placeholderTextColor="#999"
                                />
                            </View>

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

                            <CustomButton
                                title="Redefinir Senha"
                                onPress={handleResetPassword}
                                style={styles.button}
                            />

                            <CustomButton
                                title="Voltar"
                                onPress={() => setStep('code')}
                                variant="secondary"
                                style={styles.button}
                            />
                        </View>
                    )}
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
    stepContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    stepTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 18,
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
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    infoBox: {
        backgroundColor: '#fff3e0',
        borderLeftWidth: 4,
        borderLeftColor: '#ff9800',
        borderRadius: 6,
        padding: 12,
        marginBottom: 16,
    },
    infoText: {
        fontSize: 12,
        color: '#e65100',
        lineHeight: 16,
    },
    button: {
        marginVertical: 8,
    },
});
