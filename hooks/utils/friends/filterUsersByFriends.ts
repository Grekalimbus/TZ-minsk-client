import { FriendType } from "@/types/friend";
import { UserInfoType } from "@/types/userInfo";

export const filterUsersByFriends =(
    allUsers: UserInfoType[] | null,
    friends: FriendType[] | null,
    userId: string | null
  ) => {
    if (allUsers && friends && userId) {
      // Create a set of user IDs that are connected to the given user
      const connectedUserIds = friends
        .filter((friend) => friend.userFollower === userId || friend.userFollowing === userId)
        .map((friend) =>
          friend.userFollower === userId ? friend.userFollowing : friend.userFollower
        )
        .reduce((set, id) => set.add(id), new Set());

      // Filter the allUsers array to exclude connected users
      const filteredUsers = allUsers.filter(
        (user) => user._id !== userId && !connectedUserIds.has(user._id)
      );

      return filteredUsers;
    }
  }