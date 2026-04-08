import { ReaderProfileScreen } from '@/src/screens/Reader/ReaderProfileScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function ReaderProfile() {
    const navigation = createNavigationAdapter();

    return <ReaderProfileScreen navigation={navigation} />;
}
