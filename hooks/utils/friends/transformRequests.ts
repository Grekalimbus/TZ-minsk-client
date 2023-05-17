import { FriendType } from "@/types/friend";
import { UserInfoType } from "@/types/userInfo";
import { requestsFilter } from "./requestsFilter";

export function transformRequests (userId: string | null, entitiesFriend: FriendType[] | null, changeFriend: UserInfoType[] | null){
    const requests = requestsFilter(userId, entitiesFriend);
  const requestsTransForm = changeFriend?.filter((user: UserInfoType) => {
    return requests?.find((friend) => user._id === friend.userFollower);
  });
  const requestsAddStatus = requestsTransForm
    ? requestsTransForm
        .map((user) => {
          if (requests) {            
            const requestsFilter = requests.filter((friend)=> friend.userFollower === user._id || friend.userFollowing === user._id)[0]            
            const status = requestsFilter?.status;
            const friendId = requestsFilter?._id
            return { ...user, status, friendId };
          }
          return null;
        })
        .filter((user) => user !== null)
        .map((user) => user as UserInfoType)
    : null;
    return requestsAddStatus?.length ? requestsAddStatus: null
}