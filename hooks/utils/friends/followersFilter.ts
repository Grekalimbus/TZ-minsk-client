import { FriendType } from "@/types/friend";

export  const followersFilter = (
    userId: string | null,
    friendsArray: FriendType[] | null
  ): FriendType[] | null => {
    if (userId && friendsArray && friendsArray.length > 0) {
      const followers = friendsArray.filter((user) => {        
        return (
          user.userFollower !== userId &&          
          (user.userFollower === userId || user.userFollowing === userId) || (user.userFollower === userId && user.status === 'ACCEPTED')
        );
      });
      return followers ? followers: null;
    }
    return null;
  };