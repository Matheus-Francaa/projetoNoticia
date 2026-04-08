import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Header = ({ title, onBackPress, showBackButton = false }) => {
    return (
        <View style={styles.header}>
            {showBackButton && (
                <TouchableOpacity onPress={onBackPress}>
                    <Text style={styles.backButton}>← Voltar</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.spacer} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2196F3',
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    spacer: {
        width: 50,
    },
});
