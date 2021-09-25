import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome} from '@expo/vector-icons';
import {StyleSheet} from 'react-native'
/* screens */
import HomeScreen from '../screens/HomeScreen';
import ArticleScreen from '../screens/ArticleScreen';
import ClipScreen from '../screens/ClipScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* const HomeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{headerShown: false}}
          options={{ headerStyle: styles.header }}
        />
        <Stack.Screen 
          name="詳細" 
          component={ArticleScreen} 
          options={{ headerStyle: styles.header }}
        />
      </Stack.Navigator>
  );
}; */
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerStyle: styles.header }}
      />
      <Stack.Screen name="詳細" component={ArticleScreen} options={{ headerStyle: styles.header }}/>
    </Stack.Navigator>
  );
};

const ClipStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clip" component={ClipScreen} options={{ headerStyle: styles.header }}/>
    </Stack.Navigator>
  );
};

const screenOption = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Clip':
        iconName = 'bookmark';
        break;
    }
    return <FontAwesome name={iconName} size={size} color={color} />;
  },
});

export default AppNavigaotor = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOption}>
        <Tab.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
        <Tab.Screen name="Clip" component={ClipStack} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#a2c2e6'
  }
});