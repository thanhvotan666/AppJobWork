import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigator";

export type NavigationMainTabsProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export const baseURL = 'http://10.0.2.2:8000/'

export const baseUrlApi = `${baseURL}api/android`;

export const asset = (image: string) => `${baseURL}/${image}`