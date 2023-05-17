import { FriendType } from "@/types/friend";

export const followingFilter = (
    userId: string | null,
    friendsArray: FriendType[] | null
  ): FriendType[] | null => {
    if (userId && friendsArray && friendsArray.length > 0) {
      const following = friendsArray.filter((user) => {
        return (
          userId === user.userFollowing  &&  user.status === 'ACCEPTED' ||  user.userFollower === userId           
        );
      });      
      
      return following ? following: null;
    }
    return null;
  };