import { AdminHomeScreen } from '@/src/screens/Admin/AdminHomeScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function AdminHome() {
    const navigation = createNavigationAdapter();

    return <AdminHomeScreen navigation={navigation} />;
}
