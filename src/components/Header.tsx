import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
    onBackPress?: () => void;
    rightComponent?: React.ReactNode;
}

export function Header({
    title,
    showBackButton = false,
    onBackPress,
    rightComponent,
}: HeaderProps) {
    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.rightContainer}>
                {rightComponent}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#2196F3',
        elevation: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    },
    leftContainer: {
        width: 50,
        alignItems: 'flex-start',
    },
    rightContainer: {
        width: 50,
        alignItems: 'flex-end',
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    backButton: {
        padding: 4,
    },
    backText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
