import { UserInfoType } from '@/types/userInfo';
import React, { FC } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: -7px 8px 10px -3px rgba(34, 60, 80, 0.2);
  @media (max-width: 400px) {
    flex-direction: column;
    padding: 2px;
  }
`;

const ImageWrapper = styled.div`
  width: 164px;
  height: 120px;
  overflow: hidden;
  background: #c5e4e7;
  border-radius: 40%;
  cursor: pointer;
  @media (max-width: 400px) {
    width: 180px;
    height: 180px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WrapperInfo = styled.div`
  width: 100%;
  height: 100%;
`;

const UserTag = styled.div`
  margin-left: 5px;
  margin-top: 5px;
  font-weight: 700;
  color: #00474b;
  cursor: pointer;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 5px;
  padding: 4px;
  color: 00474B;
  background: #ffffff;
`;

interface Props {
  user: UserInfoType;
  image: string;
  type: string;
}

const ItemFriend: FC<Props> = ({ image, user, type }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <ImageWrapper onClick={() => router.push(`/profile/${user?._id}`)}>
        {image && <Image src={image}></Image>}
      </ImageWrapper>
      <WrapperInfo>
        <UserTag>{user?.userTag}</UserTag>
        <div>
          <FlexContainer>
            <p>Raiting : {user?.rating}</p>
            <p>Todo : {user?.todos}</p>
          </FlexContainer>
          <FlexContainer>
            <p>Followers : {user?.followers}</p>
            <p>Following : {user?.following}</p>
          </FlexContainer>
          <Button type={type} user={user} />
        </div>
      </WrapperInfo>
    </Wrapper>
  );
};

export default ItemFriend;
