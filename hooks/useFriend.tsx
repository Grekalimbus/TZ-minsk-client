import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { transformUsers } from './utils/transformUser';
import { UserInfoType } from '@/types/userInfo';
import { transformFollowers } from './utils/friends/transformFollowers';
import { transformFollowing } from './utils/friends/transformFollowing';
import { transformRequests } from './utils/friends/transformRequests';
import localStorageService from '@/services/localStorage.service';

export interface FriendsTransformType {
  followers: UserInfoType[] | null;
  following: UserInfoType[] | null;
  requests: UserInfoType[] | null;
}

const useFriend = () => {
  const { entities: entitiesUsers } = useSelector((state: RootState) => state.users);
  const { entities: entitiesFriend } = useSelector((state: RootState) => state.friends);
  const { entities: entitiesTodos } = useSelector((state: RootState) => state.todos);
  const userId = localStorageService.getUserId();

  const changeFriend =
    entitiesFriend && entitiesTodos && transformUsers(entitiesUsers, entitiesFriend, entitiesTodos);
  const followersTransform = transformFollowers(changeFriend, entitiesFriend, userId);
  const followingTransform = transformFollowing(userId, entitiesFriend, changeFriend);
  const requestsTransform = transformRequests(userId, entitiesFriend, changeFriend);

  const friends: FriendsTransformType = {
    followers: followersTransform,
    following: followingTransform,
    requests: requestsTransform,
  };

  return friends;
};

export default useFriend;
