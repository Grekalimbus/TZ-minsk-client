# **Frontend** 

## The project can be run locally
    1. Clone this repository and server repository
    2. Go to client and server and install dependencies with "npm install"
    3. In the root server run "npm run start:dev"
    4. In the folder client run "npm run dev"
<br />    

## [Click > link deploy project](http://5.53.125.173/) 
<br />

## [Click > Backend repository](https://github.com/Grekalimbus/TZ-minsk-server) 
<br />  

## About this project
<br />

## RU
Это небольшая социальная сеть, в которой пользователи могут создавать списки добрых дел, получить за них рейтинг, изменять/удалять их. Пользователи могут добавлять в друзья других пользователей и смотреть их списки добрых дел. Есть возможность оставлять комментарии. Стили в главном компоненте (Profile) отображаются динамически в зависимости от разных условий. Верстка адаптивная. 
Мне было интересно поработать над этим проектом и выучить новые технологии а также реализовать кейсы, которые я еще не делал.

## ENG
This is a small social network where users can create lists of good deeds, get a rating for them, change/delete them. Users can add other users as friends and see their lists of good deeds. It is possible to leave comments. Styles in the main component (Profile) are displayed dynamically depending on different conditions. The layout is adaptive.
It was interesting for me to work on this project and learn new technologies and also implement cases that I have not done yet.
<br />

### Used tehnolohy
A plus marked the technologies that I learned while working on the project

    + NextJS
    + Styled-component
    + Docker
   
    HTML/CSS
    Adaptive layout
    TypeScript    
    Redux        
    HTTP

<br />  

### Pages (or Components)
-Userfriendly UI/UX 

    /profile/id
    /friends/Friends
    /createTodo/CreateTodo
    /themas/Themas

<br />  

### Users emal (for login)
### Password is the same for everyone: test123

```
    1.danil@mail.ru
    2.dima@mail.ru
    3.tima@mail.ru
    4.darik@mail.ru
    5.igor@mail.ru
    6.tom@mail.ru
    7.rina@mail.ru
    8.liza@mail.ru
    9.olga@mail.ru
```

## Presentation
![Image1](https://i.postimg.cc/0NMwDLy5/image.png)
![Image1](https://i.postimg.cc/k4PB8GHw/image.png)
![Image1](https://i.postimg.cc/tR5YZXNt/image.png)
![Image1](https://i.postimg.cc/QC486df2/image.png)
![Image1](https://i.postimg.cc/L8Z9TRLW/image.png)
<br />

## Code examples
### Redux logic
[store/usersSlice.ts](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/store/usersSlice.ts)

```js
import { UserType } from '@/types/user';


export const fetchUsers = createAsyncThunk(
    "users/getUsers",
    async () => {      
      const data = await usersService.getAll()   
      const dataMap = data.map(({_id, userTag, email, image}: UserType)=> {
        return {_id, userTag, email, image}
      })               
      return dataMap
    }
);

type StateType = {
  entities: UserType[] |  null;
  loading: boolean;
}; 

const initialState: StateType = {
  entities: null,
  loading: false  
} 

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload
    });    
  },
});


export default usersSlice.reducer;
```
<br />  

### Services logic
[services/users.service.ts](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/services/users.service.ts)

```js
class usersService{
    constructor(){}   

    async getAll(){
        try {
            const { data } = await httpService.get('users/');                    
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }  

    async updateImage(id:string, payload:{image: string}){
        try {
            const {data} = await httpService.patch(`users/${id}`, payload)
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }

    async delete(id: string){
        try {
            const {data} = await httpService.delete(`users/${id}`)
            return id;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }
    
}

export default new usersService()
```
<br />  

### Custom hooks logic

[hooks/useAllUsers.tsx](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/hooks/useAllUsers.tsx)

```js
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
```
<br />

### Logic utils

[hooks/utils/transformUser.ts](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/hooks/utils/transformUser.ts)

```js
export const transformUsers = (userArray: UserType[] | null, friendArray: FriendType []|[], arrayTodos: TodoType[] | []): UserInfoType[] | null => {
  
    if (userArray && friendArray && arrayTodos) {
      const friendsMap = userArray.map((user) => transformFriends(friendArray, user._id));
      const todosMap = userArray.map((user) => transformTodo(arrayTodos, user._id));
          
      const usersInfo = userArray.map((user, index) => {
        return { ...user, ...friendsMap[index], ...todosMap[index] };
      });
      return usersInfo;
    }
    return null;
  };
```

<br />

### Components logic

[pages/profile/[profileID].tsx](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/pages/profile/%5BprofileID%5D.tsx)

```js
const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { profileID } = router.query;
  const userId = localStorageService.getUserId();
  const user = useUser(userId);
  const [value, setValue] = useState('');
  const [isEditImage, setIsEditeImage] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTodos());
    dispatch(fetchComments());
    dispatch(fetchFriends());
  }, []);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log('value', value);
  };

  const handleChangeIsEdit = () => {
    if (profileID === userId) {
      setIsEditeImage((prev) => !prev);
      setValue('');
    }
  };

  const upDateProfile = async () => {
    if (user && value.includes('https://') && value.includes('.jpg')) {
      const payload = { image: value.trim() };
      await usersService.updateImage(user._id, payload);
      dispatch(fetchUsers());
      handleChangeIsEdit();
    }
  };

  const validateUrl = !value.includes('https://') || !value.includes('.jpg') ? false : true;

  return (
    <>
      <MainContainer keywords="Profile">
        {profileID && !isEditImage ? (
          <Wrapper>
            <User handleChangeIsEdit={handleChangeIsEdit} profileID={profileID} />
            <Todos profileID={profileID} />
          </Wrapper>
        ) : (
          <WrapperChangeImage>
            {!validateUrl && <Error>Неккоректный URL</Error>}
            <InputForImage
              placeholder="url Image"
              value={value}
              onChange={(e) => handleChangeValue(e)}
            ></InputForImage>
            <WrapperButtons>
              <Button onClick={handleChangeIsEdit}>Canel</Button>
              <Button onClick={upDateProfile}>Accepted</Button>
            </WrapperButtons>
          </WrapperChangeImage>
        )}
      </MainContainer>
    </>
  );
};

export default Profile;
```





 



    
    
