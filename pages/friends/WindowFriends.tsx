import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import ItemFriend from './itemFriend/ItemFriend';
import useAllUsers from '@/hooks/useAllUsers';
import useFriend, { FriendsTransformType } from '@/hooks/useFriend';
import { UserInfoType } from '@/types/userInfo';

const Wrapper = styled.div`
  width: 575px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px 5px 10px 20px;
  background: #ffffff;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 94%;
  }
  @media (max-width: 420px) {
    padding: 10px 5px 10px 5px;
  }
`;

const WindowFriends = () => {
  const users = useAllUsers();
  const friends: FriendsTransformType = useFriend();
  const [active, setActive] = useState('1');
  const [userTag, setUserTag] = useState('');

  const usersFilter = users?.filter((user) => {
    return userTag ? user.userTag.includes(userTag.trim().toLowerCase()) : user;
  });
  const followersFilter = friends?.followers?.filter((user) => {
    return userTag ? user.userTag.includes(userTag.trim().toLowerCase()) : user;
  });
  const followingFilter = friends?.following?.filter((user) => {
    return userTag ? user.userTag.includes(userTag.trim().toLowerCase()) : user;
  });

  const handleChangeUserTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTag(e.target.value);
  };
  const handleChangeActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(e.currentTarget.id);
  };

  return (
    <Wrapper>
      <Header
        userTag={userTag}
        handleChangeUserTag={handleChangeUserTag}
        friends={friends}
        handleChangeActive={handleChangeActive}
      />
      {usersFilter &&
        active === '1' &&
        usersFilter.map((user: UserInfoType) => {
          return <ItemFriend key={user?._id} type="user" user={user} image={user?.image} />;
        })}
      {followersFilter &&
        active === '2' &&
        followersFilter.map((user: UserInfoType) => {
          return <ItemFriend key={user?._id} type="follower" user={user} image={user?.image} />;
        })}
      {followingFilter &&
        active === '3' &&
        followingFilter.map((user: UserInfoType) => {
          return <ItemFriend key={user?._id} type="following" user={user} image={user?.image} />;
        })}
    </Wrapper>
  );
};

export default WindowFriends;
