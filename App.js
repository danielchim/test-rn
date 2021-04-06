import React from 'react';
import { View, Colors, TextField, Text, Button, Typography } from 'react-native-ui-lib';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './pages/Home';
import PractiseScreen from './pages/Practise';



console.log('ready!');
const LoginScreen = ({ navigation }) => {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text h1>Login</Text>
      <TextField
        placeholder="User name"
        floatingPlaceholder={true}
      >
      </TextField>
      <TextField
        placeholder="Password"
        floatingPlaceholder={true}
      >
      </TextField>
      <Button label={"Login"} onPress={() => navigation.navigate('Tab', { screen: "Practise" })}>
      </Button>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Practise"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Practise',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
}


const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tab" component={MainTabs} options={{ gestureEnabled: false }}/>
        <Stack.Screen name="Practise" component={PractiseScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

Colors.loadColors({
  pink: '#FF69B4',
  gold: '#FFD700',
  white: '#FFFFFF'
});

Typography.loadTypographies({
  h1: { fontSize: 32 },
  h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
});

export default App;