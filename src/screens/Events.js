/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import fontSize from '../config/fontSize';
import colors from '../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {useFocusEffect} from '@react-navigation/native';

function Events(props) {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(function onLoad() {
      setIsLoading(true);
      firestore()
        .collection('events')
        .orderBy('title', 'asc')
        .get()
        .then(querySnapshot => {
          const list = querySnapshot.docs.map(doc => {
            return {id: doc.id, data: doc.data()};
          });
          setEvents(list);
          setAllEvents(list);
          setIsLoading(false);
        })
        .catch(e => {
          console.error(e);
          setIsLoading(false);
        });
    }, []),
  );

  useEffect(
    function searchHandler() {
      console.log({searchText});
      if (searchText) {
        const list = allEvents.filter(event =>
          event.data.title.toLowerCase().includes(searchText.toLowerCase()),
        );
        setEvents(list);
      } else {
        setEvents(allEvents);
      }
    },
    [searchText, allEvents],
  );

  /**
   *
   * @param {string} id
   * Updates collection with id with updated isChecked
   * local state events and allEvents are updated
   */
  function updateEvent(id) {
    const list = [...events];
    const index = list.findIndex(event => event.id === id);
    list[index].data.isChecked = !list[index].data.isChecked;
    setEvents(list);
    firestore()
      .collection('events')
      .doc(id)
      .update({
        isChecked: list[index].data.isChecked,
      })
      .then(() => console.log('Updated'))
      .catch(e => console.error(e));
  }

  function renderItem({item, index}) {
    const {isChecked, title} = item.data;
    return (
      <Pressable style={styles.dataRow} onPress={() => updateEvent(item.id)}>
        <CheckBox
          value={isChecked}
          disabled={true}
          tintColors={{true: colors.primary, false: colors.secondary}}
        />
        <Text style={styles.eventTitle}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Search Events"
            value={searchText}
            onChangeText={val => setSearchText(val)}
            placeholderTextColor={colors.secondary}
          />
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => props.navigation.navigate('CreateEvent')}>
            <Text style={styles.newText}>New</Text>
          </TouchableOpacity>
        </View>
        {isLoading && events.length === 0 && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
        {!isLoading && events.length === 0 && (
          <Text style={styles.emptyText}>No events found !</Text>
        )}
        <FlatList
          data={events}
          keyboardShouldPersistTaps="always"
          style={styles.listView}
          renderItem={renderItem}
          initialNumToRender={20}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
export default Events;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#fff'},
  container: {
    flex: 1,
    alignItems: 'center',
  },
  listView: {
    width: '100%',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 20,
  },
  eventTitle: {
    fontWeight: '600',
    fontSize: fontSize.lg,
    marginLeft: 10,
  },
  input: {
    width: '70%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
    color: '#000',
  },
  newButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 40,
    width: 80,
    borderRadius: 5,
    marginLeft: 10,
  },
  newText: {
    color: '#fff',
    fontWeight: '700',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: fontSize.md,
  },
});
