import { ReaderHomeScreen } from '@/src/screens/Reader/ReaderHomeScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function ReaderHome() {
    const navigation = createNavigationAdapter();

    return <ReaderHomeScreen navigation={navigation} />;
}
