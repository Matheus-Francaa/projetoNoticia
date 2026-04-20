import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaProps {
    children: React.ReactNode;
    style?: ViewStyle;
    bottom?: boolean;
    top?: boolean;
}

export function SafeArea({ children, style, bottom = true, top = false }: SafeAreaProps) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                top && { paddingTop: insets.top },
                bottom && { paddingBottom: insets.bottom },
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});