import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommunityScreen from '../screens/CommunityScreen';
import ChatListScreen from '../screens/ChatListScreen';
import StatusListScreen from '../screens/StatusListScreen';
import CallListScreen from '../screens/CallListScreen';
import {Colors} from '../theme/Colors';
import VectorIcon from '../utils/VectorIcon';
import {TabBarData} from '../data/TabBarData';

const Tab = createMaterialTopTabNavigator();

const TopTabbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={() => ({
        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.secondaryColor,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.tertiary,
        },
        tabBarStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })}>
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color}) => (
            <VectorIcon
              type="FontAwesome"
              name="users"
              color={color}
              size={20}
            />
          ),
        }}
      />
      {TabBarData.map(tab => (
        <Tab.Screen key={tab.id} name={tab.name} component={tab.route} />
      ))}
      {/* <Tab.Screen name="Chats" component={ChatListScreen} />
      <Tab.Screen name="Status" component={StatusListScreen} />
      <Tab.Screen name="Calls" component={CallListScreen} /> */}
    </Tab.Navigator>
  );
};

export default TopTabbar;
