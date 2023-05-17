import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { TodoType } from '@/types/todo';

const useTodo = (profileID: string | string[]) => {
  const { entities: entitiesTodos } = useSelector((state: RootState) => state.todos);
  const filterTodo = (todosArray: TodoType[], profileID: string | string[]): TodoType[] | null => {
    if (profileID && todosArray?.length > 0) {
      const filterTodo = todosArray.filter((todo) => todo.userId === profileID);
      return filterTodo;
    }
    return null;
  };

  const todos = entitiesTodos && filterTodo(entitiesTodos, profileID);

  return todos && todos?.length > 0 ? todos : null;
};

export default useTodo;
