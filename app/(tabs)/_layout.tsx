
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B1E2D',
        tabBarInactiveTintColor: '#777777',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E2DE',
          height: 60,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TextIcon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'My Account',
          tabBarLabel: 'My Account',
          tabBarIcon: ({ color, size }) => (
            <TextIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

import { Text } from 'react-native';

function TextIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  return (
    <Text style={{ color, fontSize: size }}>
      {name === 'home' ? '⌂' : '♙'}
    </Text>
  );
}
