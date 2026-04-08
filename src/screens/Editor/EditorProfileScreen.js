import { StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { useAuth } from '../../context/AuthContext';

export const EditorProfileScreen = ({ navigation }) => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Header
                title="👤 Perfil"
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <Text style={styles.text}>Perfil do Editor - {user?.name}</Text>
                <CustomButton title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    text: { fontSize: 16, marginBottom: 16 },
});
