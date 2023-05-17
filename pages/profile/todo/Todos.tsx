import React, { FC } from 'react';
import styled from 'styled-components';
import localStorageService from '@/services/localStorage.service';
import useTodo from '@/hooks/useTodo';
import ItemTodo from './ItemTodo';
import Link from 'next/link';
import { TodoType } from '@/types/todo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  overflow: auto;
  @media (max-width: 1100px) {
    width: 65%;
  }
  @media (max-width: 900px) {
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const MainTitle = styled.h1`
  margin: 0 auto;
  margin-bottom: 15px;
  text-align: center;
  color: #00474b;
  @media (max-width: 900px) {
    margin-top: 20px;
  }
  @media (max-width: 600px) {
    font-size: 24px;
  }
  @media (max-width: 440px) {
    font-size: 20px;
  }
  @media (max-width: 360px) {
    font-size: 18px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 40px;
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  background: #00474b;
  border-radius: 4px;
`;

interface Props {
  profileID: string | string[];
}
const Todos: FC<Props> = ({ profileID }) => {
  const todos: TodoType[] | null = useTodo(profileID);
  const userId = localStorageService.getUserId();

  return (
    <Wrapper>
      {!todos && userId !== profileID && <MainTitle>The user does not have todo</MainTitle>}
      {todos && <MainTitle>List of my good deeds</MainTitle>}
      {!todos && userId === profileID && (
        <LinkWrapper>
          <Link style={{ width: '100%', color: 'white' }} href="/createTodo/CreateTodo">
            Create Todo
          </Link>
        </LinkWrapper>
      )}
      {todos &&
        todos
          .reverse()
          .map((todo: TodoType) => <ItemTodo profileID={profileID} key={todo._id} todo={todo} />)}
    </Wrapper>
  );
};

export default Todos;
