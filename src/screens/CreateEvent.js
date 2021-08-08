import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../config/colors';
import fontSize from '../config/fontSize';
import firestore from '@react-native-firebase/firestore';

export default function CreateEvent(props) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function createHandler() {
    if (title && title.trim().length > 1) {
      firestore()
        .collection('events')
        .add({
          isChecked: false,
          title: title.trim(),
          uid: 'A780',
        })
        .then(() => {
          setError();
          props.navigation.goBack();
        });
    } else {
      setError('Title cannot be empty');
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Event</Text>
        <TextInput
          placeholder="Enter Event Title"
          style={styles.input}
          value={title}
          placeholderTextColor={colors.secondary}
          onChangeText={val => setTitle(val)}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.createButton} onPress={createHandler}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
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
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 40,
    width: 80,
    borderRadius: 5,
    marginTop: 10,
  },
  createText: {
    color: '#fff',
    fontWeight: '700',
  },
  error: {
    fontSize: fontSize.sm,
    color: colors.danger,
    fontWeight: '700',
  },
});
