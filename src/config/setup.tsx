import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../AppNavigator";

export type NavigationMainTabsProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export const baseURL = 'https://jobswork.vn/'

export const baseUrlApi = `${baseURL}api/`;

export const asset = (image: string) => `${baseURL}public/${image}`