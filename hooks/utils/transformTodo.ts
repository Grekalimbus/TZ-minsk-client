import { TodoType } from "@/types/todo";

export const transformTodo = (
    todosArray: TodoType[] | [],
    userId: string | null
  ): { todos: number; rating: number } => {
    if (todosArray?.length > 0 && userId) {
      const todo = todosArray.filter((todo) => todo.userId === userId);
      return { todos: todo.length, rating: todo.length * 5 };
    }
    return { todos: 0, rating: 0 };
  };