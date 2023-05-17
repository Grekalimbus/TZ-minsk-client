import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainContainer from '@/components/MainContainer';
import localStorageService from '@/services/localStorage.service';
import Todos from './todo/Todos';
import User from './user/User';
import useUser from '@/hooks/useUser';
import usersService from '@/services/users.service';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchUsers } from '@/store/usersSlice';
import { fetchTodos } from '@/store/todosSlice';
import { fetchComments } from '@/store/commentsSlice';
import { fetchFriends } from '@/store/friendsSlice';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: auto;
  margin-top: 50px;
  @media (max-width: 1100px) {
    width: 96%;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const WrapperChangeImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: auto;
  margin-top: 50px;
  padding: 10px;
  border-radius: 5px;
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 680px) {
    width: 80%;
  }
  @media (max-width: 580px) {
    width: 90%;
  }
`;

const InputForImage = styled.input`
  display: block;
  width: 90%;
  height: 30px;
  margin: 0 auto;
  padding-left: 5px;
  border: 2px solid #969393;
  border-radius: 3px;
  background: #eeeeee;
`;

const Error = styled.p`
  display: block;
  margin: auto;
  color: red;
  margin-bottom: 3px;
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 40%;
  height: 30px;
  border-radius: 3px;
  background: #0d686d;
  color: white;
  transition: all 0.3s;
  :hover {
    border: 2px solid #00474b;
  }
`;

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profileID } = router.query;
  const userId = localStorageService.getUserId();
  const user = useUser(userId);
  const [value, setValue] = useState('');
  const [isEditImage, setIsEditeImage] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTodos());
    dispatch(fetchComments());
    dispatch(fetchFriends());
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log('value', value);
  };

  const handleChangeIsEdit = () => {
    if (profileID === userId) {
      setIsEditeImage((prev) => !prev);
      setValue('');
    }
  };

  const upDateProfile = async () => {
    if (user && value.includes('https://') && value.includes('.jpg')) {
      const payload = { image: value.trim() };
      await usersService.updateImage(user._id, payload);
      dispatch(fetchUsers());
      handleChangeIsEdit();
    }
  };

  const validateUrl = !value.includes('https://') || !value.includes('.jpg') ? false : true;

  return (
    <>
      <MainContainer keywords="Profile">
        {profileID && !isEditImage ? (
          <Wrapper>
            <User handleChangeIsEdit={handleChangeIsEdit} profileID={profileID} />
            <Todos profileID={profileID} />
          </Wrapper>
        ) : (
          <WrapperChangeImage>
            {!validateUrl && <Error>Неккоректный URL</Error>}
            <InputForImage
              placeholder="url Image"
              value={value}
              onChange={(e) => handleChangeValue(e)}
            ></InputForImage>
            <WrapperButtons>
              <Button onClick={handleChangeIsEdit}>Canel</Button>
              <Button onClick={upDateProfile}>Accepted</Button>
            </WrapperButtons>
          </WrapperChangeImage>
        )}
      </MainContainer>
    </>
  );
};

export default Profile;
