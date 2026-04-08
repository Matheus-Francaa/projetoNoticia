import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export const ReaderProfileScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');
    const [interests, setInterests] = useState('');

    const handleSaveProfile = () => {
        alert('Perfil atualizado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Header
                title="👤 Meu Perfil"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>{user?.avatar || '👤'}</Text>
                    <Text style={styles.avatarText}>Leitor</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="(XX) XXXXX-XXXX"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Interesses (tags preferences)</Text>
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            placeholder="Ex: Tecnologia, Mobile, Design"
                            value={interests}
                            onChangeText={setInterests}
                            multiline={true}
                            numberOfLines={3}
                            textAlignVertical="top"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <CustomButton
                        title="Salvar Alterações"
                        onPress={handleSaveProfile}
                        style={styles.button}
                    />

                    <CustomButton
                        title="Alterar Senha"
                        onPress={() => alert('Função de alterar senha')}
                        variant="secondary"
                        style={styles.button}
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
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        fontSize: 60,
        marginBottom: 8,
    },
    avatarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        padding: 16,
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
    button: {
        marginVertical: 8,
    },
});
