import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { transformUsers } from './utils/transformUser';
import { filterUsersByFriends } from './utils/friends/filterUsersByFriends';
import localStorageService from '@/services/localStorage.service';

const useAllUsers = () => {
  const { entities: entitiesUsers } = useSelector((state: RootState) => state.users);
  const { entities: entitiesFriend } = useSelector((state: RootState) => state.friends);
  const { entities: entitiesTodos } = useSelector((state: RootState) => state.todos);
  const userId = localStorageService.getUserId();

  const userTransform =
    entitiesFriend && entitiesTodos && transformUsers(entitiesUsers, entitiesFriend, entitiesTodos);
  const filteredUsersByFriends = filterUsersByFriends(userTransform, entitiesFriend, userId);
  return filteredUsersByFriends;
};

export default useAllUsers;
