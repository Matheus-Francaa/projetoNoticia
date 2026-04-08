import { RegisterScreen } from '@/src/screens/Auth/RegisterScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function RegisterPage() {
    const navigation = createNavigationAdapter();
    return <RegisterScreen navigation={navigation} />;
}
