import { FriendType } from "@/types/friend";
import { UserInfoType } from "@/types/userInfo";
import { followingFilter } from "./followingFilter";

export function transformFollowing (userId: string | null, entitiesFriend: FriendType[] | null, changeFriend: UserInfoType[] | null){  
    const following = followingFilter(userId, entitiesFriend);

    const followersTransForm = (changeFriend || [])
    .filter((user: UserInfoType) => {
      return (following || []).find(
        (f) => (userId === f.userFollowing && f.userFollower === user._id && f.status === 'ACCEPTED')|| (user._id === f.userFollowing && userId !== user._id) || null
      );
    })
    .map((user) => {
      const friend = (following || []).find((f) => f.userFollowing === user._id || f.userFollower === user._id);           
      const status = friend ? friend.status : null;
      const friendId = friend ? friend._id : null;
      return { ...user, status, friendId };
    });         
    const finalFollowing: UserInfoType[] | null = followersTransForm.length? followersTransForm.map((following)=> following as UserInfoType):null
            
    return finalFollowing
}