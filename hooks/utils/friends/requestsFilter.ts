import { FriendType } from "@/types/friend";

export const requestsFilter = (
    userId: string | null,
    friendsArray: FriendType[] | null
  ): FriendType[] | null => {
    if (userId && friendsArray && friendsArray.length > 0) {
      const requests = friendsArray.filter((user) => {
        return (
          user.userFollower !== userId &&
          user.status === 'PENDING' &&
          (user.userFollower === userId || user.userFollowing === userId)
        );
      });
      return requests ? requests: null;
    }
    return null;
  };