import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import colors from '../config/colors';
import fontSize from '../config/fontSize';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/actions/auth.action';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [showLoader, setShowLoader] = useState(false);

  async function handleLogin() {
    if (validateEmail() && validatePassword()) {
      try {
        setShowLoader(true);
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        setShowLoader(false);
        dispatch(loginUser(response.user));
        console.log(response);
      } catch (err) {
        setShowLoader(false);

        console.error('Errors', err);
      }
    } else {
      setError('Please enter valid email and password !');
    }
  }

  function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  function validatePassword() {
    return password.length >= 6;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          placeholderTextColor={colors.secondary}
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          placeholderTextColor={colors.secondary}
          onChangeText={val => setPassword(val)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={showLoader}>
          {showLoader ? (
            <ActivityIndicator size="small" color={'#fff'} />
          ) : (
            <Text style={styles.loginText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSize.xl,
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 40,
    width: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
    color: '#000',
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.danger,
    fontWeight: '700',
  },
});
