import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './src/screens/Login';
import {persistor, store} from './src/redux/reducers/store';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Events from './src/screens/Events';
import CreateEvent from './src/screens/CreateEvent';

const App = () => {
  const Stack = createStackNavigator();
  function isLoggedIn(user = {}) {
    return Object.keys(user).length > 0;
  }
  console.log(store.getState('auth').auth.user);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Events" component={Events} />
              <Stack.Screen name="CreateEvent" component={CreateEvent} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
