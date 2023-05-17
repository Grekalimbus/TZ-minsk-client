import React, { FC } from 'react';
import styled from 'styled-components';
import localStorageService from '@/services/localStorage.service';
import friendsService from '@/services/friends.service';
import useUser from '@/hooks/useUser';
import { UserInfoType } from '@/types/userInfo';
import { FriendType } from '@/types/friend';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchFriends } from '@/store/friendsSlice';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 5px;
  padding: 4px;
  color: 00474B;
`;

const Accepted = styled.button`
  display: block;
  width: 120px;
  padding: 5px;
  font-weight: 600;
  background: #00474b;
  color: white;
  border-radius: 5px;
  @media (max-width: 480px) {
    width: 45%;
  }
`;

const Reject = styled.button`
  display: block;
  width: 120px;
  padding: 5px;
  font-weight: 600;
  border: 2px solid #f63737;
  border-radius: 5px;
  background: #ff7878;
  color: #ff0404;
  @media (max-width: 480px) {
    width: 45%;
  }
`;

interface Props {
  type: string;
  user: UserInfoType;
}

const Button: FC<Props> = ({ type, user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorageService.getUserId();
  const userActiveSession = useUser(userId);

  const handleCreateUser = async () => {
    if (userActiveSession) {
      const payload: FriendType = {
        userFollower: userActiveSession?._id,
        userFollowing: user?._id,
        followerImage: userActiveSession?.image,
        status: 'PENDING',
      };
      await friendsService.create(payload);
      dispatch(fetchFriends());
    }
  };

  const handleFollowOnFollower = async () => {
    if (userActiveSession && user?.friendId) {
      console.log('user do', user);
      const payload: FriendType = {
        userFollower: user?._id,
        userFollowing: userActiveSession?._id,
        followerImage: user?.image,
        status: 'ACCEPTED',
      };
      await friendsService.update(user?.friendId, payload);
      dispatch(fetchFriends());
      console.log('user posle', user);
    }
  };

  const handleUnsubscribe = async () => {
    if (
      user?.friendId &&
      userActiveSession &&
      (user.status === 'PENDING' || user?.status === 'REJECTED')
    ) {
      await friendsService.delete(user?.friendId);
      dispatch(fetchFriends());
    }
    if (userActiveSession && user?.friendId && user?.status === 'ACCEPTED') {
      const payload: FriendType = {
        userFollower: user?._id,
        userFollowing: userActiveSession?._id,
        followerImage: user?.image,
        status: 'REJECTED',
      };
      await friendsService.update(user?.friendId, payload);
      dispatch(fetchFriends());
    }
  };

  const handleRejected = async () => {
    if (user?.friendId && userActiveSession) {
      const payload: FriendType = {
        userFollower: user?._id,
        userFollowing: userActiveSession?._id,
        followerImage: user?.image,
        status: 'REJECTED',
      };
      await friendsService.update(user?.friendId, payload);
      dispatch(fetchFriends());
    }
  };
  return (
    <>
      {type === 'request' && user?.status === 'PENDING' && (
        <FlexContainer>
          <Accepted onClick={handleFollowOnFollower}>Accept</Accepted>
          <Reject onClick={handleRejected}>Reject</Reject>
        </FlexContainer>
      )}
      {type === 'user' && <Accepted onClick={handleCreateUser}>Follow</Accepted>}
      {type === 'follower' && user?.status === 'ACCEPTED' && (
        <Reject onClick={handleUnsubscribe}>Unsubscribe</Reject>
      )}
      {type === 'follower' && user?.status !== 'ACCEPTED' && (
        <Accepted onClick={handleFollowOnFollower}>Follow</Accepted>
      )}
      {type === 'following' && <Reject onClick={handleUnsubscribe}>Unsubscribe</Reject>}
    </>
  );
};

export default Button;
