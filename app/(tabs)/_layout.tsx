import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';

import Colors from '@/constants/Colors';
import { tabs } from '@/constants/tabs';
import { Ttabs } from '@/utils/types';
import { Image, Text, Touchable, TouchableOpacity } from 'react-native';

import logo from '../../assets/images/logo.png';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  className?: string
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
      }}>

      {tabs.map((tab: Ttabs) => {
        return <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerTitle: tab.headerTitle,
            headerLeft: () => {
              return <Image source={logo} className='ml-[20px] w-[43px] h-[26px]' />;
            },
            headerRight: () => {
              return (
                <TouchableOpacity className='mr-[20px]' onPress={()=>router.push('/search')}>
                  <Text>
                    <TabBarIcon name='search' className=' w-[43px] h-[26px]' color={'#343434'} />
                  </Text>
                </TouchableOpacity>
              )
            },
            tabBarIcon: ({ color }) => <TabBarIcon name={tab.icon} color={color} />,
          }}
        />
      })}

    </Tabs>
  );
}
