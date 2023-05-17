import { FriendType } from "@/types/friend";

export const transformFriends = (
    friendsArray: FriendType[] | [],
    userId: string
  ): { followers: number; following: number } => {   
   
    if (friendsArray?.length > 0 && userId) {
      const filterByUserId = friendsArray.filter(
        (friend) => friend.userFollower === userId || friend.userFollowing === userId
      );      
      
      const followers = filterByUserId.filter((friend) =>  friend.userFollower !== userId ||   friend.userFollower === userId && friend.status === 'ACCEPTED' );     
      
      const following = filterByUserId.filter((friend) => friend.userFollower === userId || friend.userFollowing === userId && friend.status === 'ACCEPTED');
      return { followers: followers.length, following: following.length };
    }
    return { followers: 0, following: 0 };
  };