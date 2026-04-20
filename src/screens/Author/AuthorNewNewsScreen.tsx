import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/src/components/Header';
import { CustomButton } from '@/src/components/CustomButton';
import { NavigationAdapter } from '@/src/types';
import { useNews } from '@/src/context/NewsContext';
import { useAuth } from '@/src/context/AuthContext';

interface Props {
    navigation: NavigationAdapter;
}

const categories = ['Tecnologia', 'Esportes', 'Economia', 'Política', 'Cultura', 'Saúde', 'Ciência', 'Entretenimento'];

export function AuthorNewNewsScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const { addNews } = useNews();
    const { user } = useAuth();
    
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePublish = () => {
        if (!title.trim()) {
            Alert.alert('Erro', 'O título é obrigatório');
            return;
        }
        if (!content.trim()) {
            Alert.alert('Erro', 'O conteúdo é obrigatório');
            return;
        }
        if (!category) {
            Alert.alert('Erro', 'Selecione uma categoria');
            return;
        }

        setIsSubmitting(true);
        
        addNews({
            title: title.trim(),
            subtitle: subtitle.trim() || title.trim(),
            content: content.trim(),
            category,
            author: user?.name || 'Autor',
            authorId: user?.id || 'unknown',
        });

        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert('Sucesso', 'Notícia enviada para revisão!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        }, 500);
    };

    const handleSaveDraft = () => {
        if (!title.trim() && !content.trim()) {
            Alert.alert('Aviso', 'Preencha pelo menos o título ou conteúdo para salvar');
            return;
        }
        Alert.alert('Rascunho', 'Rascunho salvo com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Header
                title="Criar Notícia"
                showBackButton
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView 
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Título *</Text>
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Digite o título da notícia"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                        />
                        <Text style={styles.charCount}>{title.length}/100</Text>
                    </View>

                    {/* Subtitle Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Subtítulo</Text>
                        <TextInput
                            style={styles.subtitleInput}
                            placeholder="Um resumo breve da notícia"
                            value={subtitle}
                            onChangeText={setSubtitle}
                            maxLength={200}
                        />
                        <Text style={styles.charCount}>{subtitle.length}/200</Text>
                    </View>

                    {/* Category Selection */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Categoria *</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            style={styles.categoryScroll}
                        >
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryChip,
                                        category === cat && styles.categoryChipSelected,
                                    ]}
                                    onPress={() => setCategory(cat)}
                                >
                                    <Text style={[
                                        styles.categoryChipText,
                                        category === cat && styles.categoryChipTextSelected,
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Content Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Conteúdo *</Text>
                        <TextInput
                            style={styles.contentInput}
                            placeholder="Escreva o conteúdo da sua notícia aqui..."
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                            maxLength={5000}
                        />
                        <Text style={styles.charCount}>{content.length}/5000</Text>
                    </View>

                    {/* Tips */}
                    <View style={styles.tipsCard}>
                        <Text style={styles.tipsTitle}>💡 Dicas para uma boa notícia:</Text>
                        <Text style={styles.tipText}>• Use um título chamativo e informativo</Text>
                        <Text style={styles.tipText}>•分段总结新闻内容，确保清晰易读</Text>
                        <Text style={styles.tipText}>• Adicione imagens para ilustrar</Text>
                        <Text style={styles.tipText}>• Revise antes de publicar</Text>
                    </View>
                </ScrollView>

                {/* Action Buttons */}
                <View style={[styles.buttonContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                    <CustomButton
                        title="Publicar"
                        onPress={handlePublish}
                        loading={isSubmitting}
                        fullWidth
                    />
                    <CustomButton
                        title="Salvar Rascunho"
                        onPress={handleSaveDraft}
                        variant="secondary"
                        fullWidth
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    titleInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        fontSize: 18,
        fontWeight: '500',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    subtitleInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    contentInput: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        lineHeight: 24,
    },
    charCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },
    categoryScroll: {
        flexDirection: 'row',
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    categoryChipSelected: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    categoryChipText: {
        fontSize: 14,
        color: '#666',
    },
    categoryChipTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    tipsCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
        marginTop: 8,
    },
    tipsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1976D2',
        marginBottom: 8,
    },
    tipText: {
        fontSize: 13,
        color: '#1565C0',
        marginBottom: 4,
        lineHeight: 18,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
});