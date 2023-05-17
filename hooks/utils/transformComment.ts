import { CommentType } from "@/types/comment";
import { CommentInfoType } from "@/types/commentInfo";
import { TodoType } from "@/types/todo";
import { UserType } from "@/types/user";




export const transformComment = (
  commentsArray: CommentType[],
  entitiesUsers: UserType[],
  todo: TodoType
): CommentInfoType[] | null => {
  if (commentsArray?.length > 0 && entitiesUsers?.length) {
    const comment: CommentType[] = commentsArray.filter((comment) => comment.todoId === todo._id);  
    
    if (comment.length > 0 ) {                                    
        const changeComments = comment.reverse().map((comment) => {
        const user = entitiesUsers.filter((user: UserType) => user._id === comment.userId)[0];
        return { ...comment, userTag: user.userTag, image: user.image } as CommentInfoType;
      });
      return changeComments.filter((comment) => comment !== null) as CommentInfoType[];
    }
  }
  return null;
};





