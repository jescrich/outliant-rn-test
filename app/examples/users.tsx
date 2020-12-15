import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList, Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Actions from '../store/actions';
import { RootState } from '../store';
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
  avatar: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    width: 50,
    height: 50,
    marginRight: 20,
    opacity: 0.9,

  },
  headerList: { height: 80, backgroundColor: '#DDDDDD', justifyContent: 'center' },
  list: { flex: 1, marginLeft: 20 },
  listSeparator: { backgroundColor: '#707070', height: 1 },
  listItem: { flexDirection: 'row', height: 96, alignItems: 'center' },
  footerList: {
    height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center',
  },
  legend: {
    textAlign: 'center', fontSize: 14,
  },
});

const UsersList = () => {
  const dispatch = useDispatch();

  const [noMoreDataReached, setNoMoreDataReached] = useState(false);
  const isLoading = useSelector((r: RootState) => r.appState.isLoading);
  const isLoadingMore = useSelector((r: RootState) => r.appState.isLoadingMore);
  const users = useSelector((r: RootState) => r.appState.users);

  const fetchUsers = () => dispatch(Actions.getRandomUsers());

  const fetchMore = (info: any) => {
    if (users.pageSize > users.page && !noMoreDataReached) {
      dispatch(Actions.getRandomUsers(users.page + 1));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setNoMoreDataReached(users.page === users.totalPages);
  }, [users]);

  const userItem = (data: any) => {
    const { item, index } = data;
    return (
      <View
        key={index}
        style={styles.listItem}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text>
          {item.first_name}
          {' '}
          {item.last_name}
        </Text>
      </View>
    );
  };

  const separator = () => <View style={styles.listSeparator} />;

  return (
    <View style={styles.fullFlex}>
      <View style={styles.headerList}>
        <Text style={{ textAlign: 'center' }}>Users</Text>
      </View>
      <FlatList
        style={styles.list}
        data={users.data}
        renderItem={userItem}
        ItemSeparatorComponent={separator}
        contentOffset={{ y: isLoading ? -60 : 0, x: 0 }}
        windowSize={6}
        keyExtractor={(i) => i.id.toString()}
        onRefresh={fetchUsers}
        refreshing={isLoading}
        initialNumToRender={users.pageSize}
        maxToRenderPerBatch={users.pageSize}
        onEndReachedThreshold={0.001}
        onEndReached={fetchMore}
      />
      {isLoadingMore
       && (
       <View style={styles.footerList}>
         <Loader size={10} maxSize={30} color="#7FB900" />
       </View>
       )}

      {noMoreDataReached
            && (
            <View style={styles.footerList}>
              <Text style={styles.legend}>- no more users :) -</Text>
            </View>
            )}
    </View>
  );
};

export default UsersList;
