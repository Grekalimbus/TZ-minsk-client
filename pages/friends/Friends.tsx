import React, { useEffect } from 'react';
import MainContainer from '@/components/MainContainer';
import RequestsFriend from './RequestsFriends';
import WindowFriends from './WindowFriends';
import useFriend, { FriendsTransformType } from '@/hooks/useFriend';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchUsers } from '@/store/usersSlice';
import { fetchTodos } from '@/store/todosSlice';
import { fetchFriends } from '@/store/friendsSlice';

const Friends = () => {
  const friends: FriendsTransformType = useFriend();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTodos());
    dispatch(fetchFriends());
  }, []);

  return (
    <MainContainer keywords="Friends">
      {friends?.requests && <RequestsFriend requests={friends.requests} />}
      <WindowFriends />
    </MainContainer>
  );
};

export default Friends;
