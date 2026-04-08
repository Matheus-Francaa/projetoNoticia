import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { router } from 'expo-router';

export default function RecoveryScreen() {
    const [email, setEmail] = useState('');

    const handleRecover = () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, digite seu email');
            return;
        }
        Alert.alert('Sucesso', 'Instruções enviadas para seu email!');
        router.back();
    };

    return (
        <View style={styles.container}>
            <Header title="Recuperar Senha" showBackButton onBackPress={() => router.back()} />
            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <Text style={styles.icon}>🔑</Text>
                    <Text style={styles.title}>Esqueceu sua senha?</Text>
                    <Text style={styles.subtitle}>
                        Digite seu email e enviaremos instruções para recuperar sua senha
                    </Text>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <CustomButton title="Enviar" onPress={handleRecover} />
                    <CustomButton
                        title="Voltar"
                        onPress={() => router.back()}
                        variant="secondary"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    form: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
        alignItems: 'center',
    },
    icon: {
        fontSize: 60,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        marginBottom: 20,
    },
});
