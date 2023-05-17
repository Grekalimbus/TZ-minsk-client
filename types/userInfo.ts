export interface UserInfoType {
    _id: string;
    userTag: string;
    email: string;    
    rating: number;
    followers: number;
    following: number;
    friendId?: string
    todos: number;
    image: string;
    status?: string
  }