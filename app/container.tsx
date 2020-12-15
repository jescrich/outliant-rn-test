import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import UsersList from './examples/users';
import Welcome from './examples/welcome';
import store from './store';

const Container = () => {
  const RootStack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultTheme}>
        <RootStack.Navigator
          initialRouteName="Welcome"
          headerMode="none"
        >
          <RootStack.Screen name="Welcome" component={Welcome} />
          <RootStack.Screen name="ExampleA" component={UsersList} />

        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Container;
