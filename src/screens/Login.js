import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from './config/colors';
import fontSize from './config/fontSize';

export default function Login() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" style={styles.input} />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
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
  },
  loginText: {
    color: '#fff',
    fontWeight: '700',
  },
});
