import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import useComment from '@/hooks/useComment';
import localStorageService from '@/services/localStorage.service';
import todosService from '@/services/todos.service';
import commentsService from '@/services/comments.service';
import { TodoType } from '@/types/todo';
import { CommentInfoType } from '@/types/commentInfo';
import { getFormattedDate } from '../../../utils/createData';
import { CommentType } from '@/types/comment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchComments } from '@/store/commentsSlice';
import { fetchTodos } from '@/store/todosSlice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border: 3px solid #00474b;
  border-radius: 12px;
  background: #f3f8fb;
`;

const Setting = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  margin-right: 5px;
  margin-top: 5px;
  background: 0;
  cursor: pointer;
`;

const NameTodo = styled.h3`
  width: 80%;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  color: white;
  background: #00474b;
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const Description = styled.article`
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 4px;
  background: rgba(2, 2, 2, 0.1);
  color: black;
`;

const FieldComment = styled.input`
  width: 80%;
  margin-bottom: 5px;
  padding: 8px;
  background: 0;
  border-bottom: 1px solid #0d686d;
  color: #0d686d;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 80%;
  height: 35px;
  margin-bottom: 20px;
`;

const HideComment = styled.button`
  display: block;
  width: 120px;
  height: 100%;
  font-weight: 600;
  background: #00474b;
  border-radius: 3px;
  color: white;
`;
// =====
// isEditable true style

const Title = styled.input`
  display: block;
  width: 80%;
  height: 40px;
  margin: 0 auto;
  padding: 5px;
  background: #eeeeee;
  border: 1px solid #969393;
  border-radius: 5px;
`;

const DescriptionIsEditable = styled.textarea`
  display: block;
  width: 80%;
  height: 200px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 5px;
  background: #eeeeee;
  border: 1px solid #969393;
  border-radius: 5px;
  resize: none;
  padding: 5px;
`;

const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: normal;
  }
`;

const ButtonIsEditable = styled.button`
  display: block;
  width: 25%;
  height: 35px;
  font-weight: 700;
  background: #c5e4e7;
  color: #00474b;
  border-radius: 5px;
  transition: all 0.3s;
  :hover {
    border: 2px solid #00474b;
  }
  @media (max-width: 900px) {
    width: 30%;
  }
  @media (max-width: 700px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

interface Props {
  profileID: string | string[];
  todo: TodoType;
}

const ItemTodo: FC<Props> = ({ todo, profileID }) => {
  const dispatch = useDispatch<AppDispatch>();
  const comments: CommentInfoType[] | null = useComment(todo);
  const userId = localStorageService.getUserId();
  const prevValue = useRef(
    todo ? { title: todo.title, description: todo.description } : { title: '', description: '' }
  );
  const [value, setValue] = useState(prevValue.current);
  const [valueComment, setValueComment] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [hideComments, setHideComments] = useState(false);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeIdEditable = () => {
    setIsEditable((prev) => !prev);
    setValue(prevValue.current);
  };

  const hideTodo = () => {
    setHideComments((prev) => !prev);
  };

  // delete all comments associated with todo, and todo itself
  const handleDelete = async () => {
    if (todo._id) {
      if (comments?.length) {
        for (const comment of comments) {
          await commentsService.delete(comment._id);
        }
      }
      await todosService.delete(todo._id);
      dispatch(fetchTodos());
      dispatch(fetchComments());
    }
  };

  const handleUpdate = async () => {
    if (todo._id && value.title && value.description) {
      const updateTodo = { ...todo, title: value.title, description: value.description };
      await todosService.update(todo._id, updateTodo);
      prevValue.current = { title: value.title, description: value.description };
      dispatch(fetchComments());
      dispatch(fetchTodos());
      changeIdEditable();
    }
  };

  const createComment = async () => {
    const date = getFormattedDate();

    const todoId = todo._id ? todo._id : null;
    const payload: CommentType | null =
      userId && todoId ? { ...date, title: valueComment, userId, todoId } : null;

    if (payload) {
      await commentsService.create(payload);
      dispatch(fetchComments());
      dispatch(fetchTodos());
      setValueComment('');
    }
  };
  return (
    <Wrapper>
      {userId === profileID && (
        <Setting onClick={() => changeIdEditable()}>
          <img src="https://i.postimg.cc/xT422xYY/settings-ikon.png"></img>
        </Setting>
      )}
      {!isEditable ? (
        <NameTodo>{prevValue.current.title}</NameTodo>
      ) : (
        <Title
          name="title"
          placeholder="Title"
          value={value?.title}
          onChange={(e) => handleChangeValue(e)}
        ></Title>
      )}
      {!isEditable ? (
        <Description>{prevValue.current.description}</Description>
      ) : (
        <DescriptionIsEditable
          name="description"
          placeholder="Description"
          value={value.description}
          onChange={(e) => handleChangeValue(e)}
        ></DescriptionIsEditable>
      )}
      {!isEditable && (
        <FieldComment
          placeholder="Write a comment"
          value={valueComment}
          onChange={(e) => setValueComment(e.target.value)}
        ></FieldComment>
      )}
      {valueComment && (
        <ButtonWrapper>
          <ButtonIsEditable onClick={createComment}>Submit</ButtonIsEditable>
          <ButtonIsEditable style={{ marginRight: '10px' }} onClick={() => setValueComment('')}>
            Cancel
          </ButtonIsEditable>
        </ButtonWrapper>
      )}
      {!isEditable && comments && (
        <>
          <ButtonWrapper>
            <HideComment onClick={hideTodo}>{`${
              !hideComments ? 'Hide comments' : 'Show comments'
            } `}</HideComment>
          </ButtonWrapper>
          {!hideComments &&
            comments.map((comment) => (
              <Comment key={comment?._id} comment={comment} profileID={profileID} />
            ))}
        </>
      )}
      {isEditable && (
        <WrapperButtons>
          <ButtonIsEditable onClick={handleDelete}>Delete todo</ButtonIsEditable>
          <ButtonIsEditable onClick={changeIdEditable}>Cancel</ButtonIsEditable>
          <ButtonIsEditable onClick={handleUpdate}>Accept changes</ButtonIsEditable>
        </WrapperButtons>
      )}
    </Wrapper>
  );
};

export default ItemTodo;
