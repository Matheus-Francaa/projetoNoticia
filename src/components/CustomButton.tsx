import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    View,
} from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

export function CustomButton({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    icon,
    style,
    textStyle,
    fullWidth = false,
}: CustomButtonProps) {
    const isDisabled = disabled || loading;

    const sizeStyles = {
        small: { paddingVertical: 10, paddingHorizontal: 16 },
        medium: { paddingVertical: 14, paddingHorizontal: 24 },
        large: { paddingVertical: 18, paddingHorizontal: 32 },
    };

    const textSizes = {
        small: 13,
        medium: 15,
        large: 16,
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                sizeStyles[size],
                fullWidth && styles.fullWidth,
                isDisabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator 
                    color={variant === 'secondary' || variant === 'outline' ? '#2196F3' : '#fff'} 
                    size="small"
                />
            ) : (
                <View style={styles.content}>
                    {icon && <Text style={styles.icon}>{icon}</Text>}
                    <Text
                        style={[
                            styles.text,
                            styles[`${variant}Text` as keyof typeof styles],
                            { fontSize: textSizes[size] },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6,
        elevation: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 16,
        marginRight: 8,
    },
    primary: {
        backgroundColor: '#2196F3',
    },
    secondary: {
        backgroundColor: '#E3F2FD',
    },
    danger: {
        backgroundColor: '#f44336',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#2196F3',
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: '#fff',
    },
    secondaryText: {
        color: '#1976D2',
    },
    dangerText: {
        color: '#fff',
    },
    outlineText: {
        color: '#2196F3',
    },
});