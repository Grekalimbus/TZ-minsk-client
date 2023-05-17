import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { transformUsers } from './utils/transformUser';

const useUser = (userId: string | null) => {
  const { entities: entitiesUsers } = useSelector((state: RootState) => state.users);
  const { entities: entitiesFriend } = useSelector((state: RootState) => state.friends);
  const { entities: entitiesTodos } = useSelector((state: RootState) => state.todos);

  const users =
    entitiesFriend &&
    entitiesTodos &&
    entitiesUsers &&
    transformUsers(entitiesUsers, entitiesFriend, entitiesTodos);

  return users ? users?.filter((user) => user._id === userId)[0] : null;
};

export default useUser;
