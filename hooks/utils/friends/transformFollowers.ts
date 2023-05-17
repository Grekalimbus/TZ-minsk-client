import { FriendType } from "@/types/friend";
import { UserInfoType } from "@/types/userInfo";
import { followersFilter } from "./followersFilter";

export function transformFollowers (changeFriend: UserInfoType[] | null,entitiesFriend:FriendType[] | null,  userId: string | null){
  const followers = followersFilter(userId, entitiesFriend);
    const followersTransForm = (changeFriend || [])
    .filter((user: UserInfoType) => {
      return (followers || []).find(
        (friend) => (user._id === friend.userFollower && userId !== user._id) || null
      );
    })
    .map((user) => {
      const friend = (followers || []).find((f) => f.userFollower === user._id);
      const status = friend ? friend.status : null;
      const friendId = friend ? friend._id : null;
      return { ...user, status, friendId };
    });

  const followersTransFormByFollowing = (changeFriend || [])
    .filter((user: UserInfoType) => {
      return (followers || []).find(
        (friend) =>
          user._id === friend.userFollowing && user._id !== userId && friend.status === 'ACCEPTED' 
      );
    })
    .map((user) => {
      const friend = (followers || []).find((f) => f.userFollowing === user._id || null);
      const status = friend ? friend.status : null;
      const friendId = friend ? friend._id : null;
      return friend ? { ...user, status, friendId } : null;
    });

  const concatFollowers = [
    ...followersTransForm.filter((x) => x !== null),
    ...followersTransFormByFollowing.filter((x) => x !== null),
  ];
  const finalFollowers: UserInfoType[] | null = concatFollowers.length
    ? concatFollowers.map((follower) => follower as UserInfoType)
    : null;
    return finalFollowers
}