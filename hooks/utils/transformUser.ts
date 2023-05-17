import { UserInfoType } from "./../../types/userInfo";
import { FriendType } from "@/types/friend";
import { TodoType } from "@/types/todo";
import { UserType } from "@/types/user";
import { transformFriends } from "./friends/transformFriend";
import { transformTodo } from "./transformTodo";

export const transformUsers = (userArray: UserType[] | null, friendArray: FriendType []|[], arrayTodos: TodoType[] | []): UserInfoType[] | null => {
  
    if (userArray && friendArray && arrayTodos) {
      const friendsMap = userArray.map((user) => transformFriends(friendArray, user._id));
      const todosMap = userArray.map((user) => transformTodo(arrayTodos, user._id));
          
      const usersInfo = userArray.map((user, index) => {
        return { ...user, ...friendsMap[index], ...todosMap[index] };
      });
      return usersInfo;
    }
    return null;
  };