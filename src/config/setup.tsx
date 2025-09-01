import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigator";

export type NavigationMainTabsProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export const baseUrlApi = 'http://10.0.2.2:8000/api/android';