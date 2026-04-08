import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';

export const AuthorNewNewsScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [state, setState] = useState('SP');

    const handleCreateNews = () => {
        if (!title.trim() || !excerpt.trim() || !content.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        Alert.alert('Sucesso', 'Notícia criada com sucesso!');
        navigation.navigate('AuthorMyNews');
    };

    return (
        <View style={styles.container}>
            <Header
                title="✨ Nova Notícia"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    {/* Title */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Título *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o título da notícia"
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Excerpt */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Resumo *</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Digite um breve resumo"
                            value={excerpt}
                            onChangeText={setExcerpt}
                            multiline={true}
                            numberOfLines={3}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Content */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Conteúdo *</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput, { height: 150 }]}
                            placeholder="Digite o conteúdo completo da notícia"
                            value={content}
                            onChangeText={setContent}
                            multiline={true}
                            numberOfLines={8}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Tags */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tags (separadas por vírgula)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: React, Mobile, Tecnologia"
                            value={tags}
                            onChangeText={setTags}
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* State */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.stateButtons}>
                            {['SP', 'RJ', 'MG', 'BA', 'PR', 'DF'].map(st => (
                                <CustomButton
                                    key={st}
                                    title={st}
                                    onPress={() => setState(st)}
                                    variant={state === st ? 'primary' : 'secondary'}
                                    style={[styles.stateButton, state === st && styles.stateButtonActive]}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            ℹ️ Campos com * são obrigatórios
                        </Text>
                    </View>

                    {/* Buttons */}
                    <CustomButton
                        title="Publicar Notícia"
                        onPress={handleCreateNews}
                        style={styles.button}
                    />

                    <CustomButton
                        title="Cancelar"
                        onPress={() => navigation.goBack()}
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
    multilineInput: {
        textAlignVertical: 'top',
    },
    stateButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    stateButton: {
        flex: 0.3,
        marginVertical: 4,
    },
    stateButtonActive: {
        backgroundColor: '#2196F3',
    },
    infoBox: {
        backgroundColor: '#e3f2fd',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        borderRadius: 6,
        padding: 12,
        marginVertical: 16,
    },
    infoText: {
        fontSize: 12,
        color: '#1976d2',
        lineHeight: 16,
    },
    button: {
        marginVertical: 8,
    },
});
