import React, { useState } from 'react';
import styled from 'styled-components';
import MainContainer from '@/components/MainContainer';
import localStorageService from '@/services/localStorage.service';
import todosService from '@/services/todos.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchTodos } from '@/store/todosSlice';
import { fetchComments } from '@/store/commentsSlice';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
  height: 370px;
  margin: auto;
  margin-top: 100px;
  padding: 20px 0 15px 0;
  background: #ffffff;
  border-radius: 11px;
  @media (max-height: 700px) {
    margin-top: 50px;
  }
  @media (max-height: 560px) {
    margin-top: 20px;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const P = styled.p`
  margin: 0 auto;
  margin-bottom: 5px;
  text-align: center;
  color: #00474b;
`;

const Title = styled.input`
  display: block;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  padding: 5px;
  background: #eeeeee;
  border: 1px solid #969393;
  border-radius: 5px;
`;

const Description = styled.textarea`
  display: block;
  width: 90%;
  height: 200px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 5px;
  background: #eeeeee;
  border: 1px solid #969393;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  display: block;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  margin-top: 20px;
  background: #00474b;
  border-radius: 5px;
  color: white;
`;

const CreateTodo = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorageService.getUserId();
  const [value, setValue] = useState({ title: '', description: '' });
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    if (value.title && value.description && userId) {
      const payload = {
        userId,
        title: value.title,
        description: value.description,
        ratingPoints: 5,
      };
      await todosService.create(payload);
      dispatch(fetchTodos());
      dispatch(fetchComments());
      router.push(`/profile/${userId}`);
    }
    return;
  };
  return (
    <MainContainer keywords="Todo">
      <Wrapper>
        <P>5 rating points will be awarded for each todo</P>
        <Title
          name="title"
          placeholder="Title"
          value={value.title}
          onChange={(e) => handleChangeValue(e)}
        ></Title>
        <Description
          name="description"
          placeholder="Description"
          value={value.description}
          onChange={(e) => handleChangeValue(e)}
        ></Description>
        <Button onClick={handleSubmit}>Create</Button>
      </Wrapper>
    </MainContainer>
  );
};

export default CreateTodo;
