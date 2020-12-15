import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import Loader from '../shared/loader';

const styles = StyleSheet.create({
  scrollView: {},
  fullFlex: { flex: 1 },
  body: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const Welcome = (props: any) => {
  const navigation = useNavigation();

  const performTimeConsumingTask = (timeout: number) => new Promise((resolve) => setTimeout(
    () => {
      resolve(1);
    },
    timeout,
  ));

  // Use focus instead of effect to handle back navigations actions as a part of this example.
  useFocusEffect(
    useCallback(() => {
      performTimeConsumingTask(3000).then(() => navigation.navigate('ExampleA'));
    }, []),
  );

  return (
    <View style={styles.fullFlex}>
      <SafeAreaView style={styles.fullFlex}>
        <View style={styles.body}>
          <Loader size={16} maxSize={89} color="#7FB900" />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Welcome;
