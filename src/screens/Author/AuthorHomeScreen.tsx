import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Header } from '@/src/components/Header';
import { NavigationAdapter } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

const mockNews = [
    {
        id: '1',
        title: 'Minhas notícias',
        subtitle: 'Minhas publicações',
        author: 'Você',
        date: '2024-01-15',
        category: 'Pessoal',
    },
];

interface Props {
    navigation: NavigationAdapter;
}

export function AuthorHomeScreen({ navigation }: Props) {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Header title="Área do Autor" />
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeText}>Bem-vindo, {user?.name || 'Autor'}!</Text>
                <Text style={styles.roleText}>Você está na área de autor</Text>
            </View>
            <View style={styles.menuSection}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('AuthorStack')}
                >
                    <Text style={styles.menuIcon}>📝</Text>
                    <Text style={styles.menuText}>Minhas Notícias</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('NewsDetail', { news: mockNews[0] })}
                >
                    <Text style={styles.menuIcon}>➕</Text>
                    <Text style={styles.menuText}>Criar Notícia</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.replace('ReaderStack')}
                >
                    <Text style={styles.menuIcon}>👤</Text>
                    <Text style={styles.menuText}>Meu Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    welcomeSection: {
        backgroundColor: '#2196F3',
        padding: 20,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    roleText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    menuSection: {
        paddingHorizontal: 16,
    },
    menuItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },
    menuIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});
