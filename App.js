import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './src/screens/Login';
import {persistor, store} from './src/redux/reducers/store';
import {Provider, useSelector, useStore} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Events from './src/screens/Events';
import CreateEvent from './src/screens/CreateEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavigationStack = ({isLoggedIn}) => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {!isLoggedIn && <Stack.Screen name="Login" component={Login} />}

            <Stack.Screen name="Events" component={Events} />
            <Stack.Screen name="CreateEvent" component={CreateEvent} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then(res => {
        console.log({res});
        if (res) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log({isLoggedIn, isLoading});
  }, [isLoggedIn, isLoading]);

  return (
    <SafeAreaProvider>
      {!isLoading && <NavigationStack isLoggedIn={isLoggedIn} />}
    </SafeAreaProvider>
  );
};

export default App;
