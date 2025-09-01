import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';

import HomeScreen from './screens/main-screens/HomeScreen';
import ProfileScreen from './screens/main-screens/ProfileScreen';
import UtilityScreen from './screens/main-screens/UtilityScreen';
import ChatScreen from './screens/main-screens/ChatScreen';
import MenuScreen from './screens/main-screens/MenuScreen';
import SearchScreen from './screens/SearchScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';

const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>;

export default function MainTabs({navigation} : Props) {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName =
            route.name === 'Trang chủ' ? 'home-outline' :
            route.name === 'Hồ sơ' ? 'person-outline' :
            route.name === 'Tiện ích' ? 'grid-outline' :
            route.name === 'Chat' ? 'chatbubbles-outline' :
            route.name === 'Menu' ? 'menu-outline' :
            'ellipse';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Trang chủ" component={HomeScreen}/>
        <Tab.Screen name="Hồ sơ" component={ProfileScreen} />
        <Tab.Screen name="Tiện ích" component={UtilityScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
      </Tab.Navigator>
  );
}
