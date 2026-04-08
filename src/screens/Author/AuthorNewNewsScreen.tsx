import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorNewNewsScreen({ navigation }: Props) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handlePublish = () => {
        navigation.goBack();
    };

    const handleSaveDraft = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header title="Criar Notícia" showBackButton onBackPress={() => navigation.goBack()} />
            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o título da notícia"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Subtítulo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o subtítulo"
                    value={subtitle}
                    onChangeText={setSubtitle}
                />

                <Text style={styles.label}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Tecnologia, Esportes..."
                    value={category}
                    onChangeText={setCategory}
                />

                <Text style={styles.label}>Conteúdo</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Digite o conteúdo da notícia"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    numberOfLines={6}
                />

                <View style={styles.buttonContainer}>
                    <CustomButton title="Publicar" onPress={handlePublish} />
                    <CustomButton title="Salvar Rascunho" onPress={handleSaveDraft} variant="secondary" />
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
        padding: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 24,
        marginBottom: 40,
    },
});
