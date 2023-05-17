import { TodoType } from '@/types/todo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { transformComment } from './utils/transformComment';
import { CommentInfoType } from '@/types/commentInfo';

const useComment = (todo: TodoType) => {
  const { entities: entitiesComments } = useSelector((state: RootState) => state.comments);
  const { entities: entitiesUsers } = useSelector((state: RootState) => state.users);

  const comment: CommentInfoType[] | null =
    entitiesComments && entitiesUsers && transformComment(entitiesComments, entitiesUsers, todo);

  return comment;
};

export default useComment;
