import React, { FC } from 'react';
import styled from 'styled-components';
import useUser from '@/hooks/useUser';
import localStorageService from '@/services/localStorage.service';
import usersService from '@/services/users.service';
import commentsService from '@/services/comments.service';
import todosService from '@/services/todos.service';
import friendsService from '@/services/friends.service';
import { UserInfoType } from '@/types/userInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 238px;
  height: 283px;
  border: 3px solid #0d686d;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.15);
  color: #0d686d;
  @media (max-width: 900px) {
    width: 65%;
    height: 200px;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 380px) {
    width: 100%;
  }
`;

const UserTag = styled.h2`
  margin-top: 15px;
  font-weight: 600;
  @media (max-width: 900px) {
    margin-top: 3px;
  }
`;

const Email = styled.p`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 900px) {
    margin-top: 2px;
    margin-bottom: 8px;
  }
`;

const TitleStata = styled.p`
  margin-top: 4px;
  font-size: 18px;
  @media (max-width: 900px) {
    margin-top: 2px;
  }
`;

const DeleteProfile = styled.button`
  width: 90%;
  height: 40px;
  margin-top: 20px;
  font-weight: 700;
  border-radius: 3px;
  background: #ff5e5e;
  color: white;
  transition: all 0.3s;
  :hover {
    border: 3px solid #f63737;
  }
  @media (max-width: 900px) {
    width: 65%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 380px) {
    width: 100%;
  }
`;

const Info: FC<{ profileID: string }> = ({ profileID }) => {
  const router = useRouter();
  const user: UserInfoType | null = useUser(profileID);
  const userId = localStorageService.getUserId();

  const { entities: entitiesTodos } = useSelector((state: RootState) => state.todos);
  const { entities: entitiesComments } = useSelector((state: RootState) => state.comments);
  const { entities: entitiesFriend } = useSelector((state: RootState) => state.friends);
  const filterTodos = entitiesTodos?.filter((todo) => todo.userId === userId);
  const filterComments = entitiesComments?.filter((comment) => comment.userId === userId);
  const filterFriend = entitiesFriend?.filter(
    (friend) => friend.userFollower === userId || friend.userFollowing === userId
  );

  const deleteProfile = async () => {
    if (filterComments && filterFriend && filterTodos && userId) {
      for (const todo of filterTodos) {
        if (todo._id !== undefined) {
          await todosService.delete(todo?._id);
        }
      }
      for (const comment of filterComments) {
        if (comment._id !== undefined) {
          await commentsService.delete(comment?._id);
        }
      }
      for (const friend of filterFriend) {
        if (friend._id !== undefined) {
          await friendsService.delete(friend?._id);
        }
      }
      await usersService.delete(userId);
      localStorageService.deleteTokens();
      router.push('/');
    }
  };

  return !user ? (
    <h3>Loading...</h3>
  ) : (
    <>
      <Wrapper>
        <UserTag>{user?.userTag}</UserTag>
        <Email>{user?.email}</Email>
        <TitleStata>{user?.rating} Rating</TitleStata>
        <TitleStata>{user?.followers} Followers</TitleStata>
        <TitleStata>{user?.following} Following</TitleStata>
        <TitleStata>{user?.todos} Todos</TitleStata>
      </Wrapper>
      {userId === profileID && (
        <DeleteProfile onClick={deleteProfile}>Delete my profile</DeleteProfile>
      )}
    </>
  );
};

export default Info;
