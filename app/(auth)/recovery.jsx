import { RecoveryScreen } from '@/src/screens/Auth/RecoveryScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function RecoveryPage() {
    const navigation = createNavigationAdapter();
    return <RecoveryScreen navigation={navigation} />;
}
