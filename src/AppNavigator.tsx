import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import SearchScreen from './screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/ionicons';

import HomeScreen from './screens/main-screens/HomeScreen';
import ProfileScreen from './screens/main-screens/ProfileScreen';
import UtilityScreen from './screens/main-screens/UtilityScreen';
import ChatScreen from './screens/main-screens/ChatScreen';
import MenuScreen from './screens/main-screens/MenuScreen';
import JobScreen from './screens/JobScreen';
import { AppliedJobsScreen } from './screens/AppliedJobsScreen';
export type RootStackParamList = {
  MainTabs: undefined;
  'Tìm kiếm': undefined;
  'Công việc': {id: number};
  'Việc đã lưu lại': undefined;
  'Việc đã ứng tuyển': undefined;
};

export type TabParamList = {
  'Trang chủ': undefined;
  'Hồ sơ': undefined;
  'Tiện ích': undefined;
  'Chat': undefined;
  'Menu': undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        <Stack.Screen name="Tìm kiếm" component={SearchScreen} />
        <Stack.Screen name="Công việc" component={JobScreen} />
        <Stack.Screen name="Việc đã lưu lại" component={JobScreen} />
        <Stack.Screen name="Việc đã ứng tuyển" component={AppliedJobsScreen} />
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}