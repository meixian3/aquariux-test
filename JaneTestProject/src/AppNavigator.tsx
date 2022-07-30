import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';


const Stack = createStackNavigator();

function TopLevelNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ContactList"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ContactList" component={ContactList} />
      <Stack.Screen name="EditContact" component={EditContact} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <TopLevelNavigator />
      </NavigationContainer>
    );
  }
}
