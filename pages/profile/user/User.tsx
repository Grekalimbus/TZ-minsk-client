import React, { FC } from 'react';
import styled from 'styled-components';
import useUser from '@/hooks/useUser';
import Info from './Info';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-top: 15px;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  height: 260px;
  margin-bottom: 40px;
  border-radius: 50%;
  border: 3px solid #0d686d;
  user-select: none;
  object-fit: inherit;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 900px) {
    margin-bottom: 20px;
    width: 240px;
    height: 240px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface Props {
  handleChangeIsEdit: () => void;
  profileID: string | string[];
}

const User: FC<Props> = ({ profileID, handleChangeIsEdit }) => {
  const id = Array.isArray(profileID) ? profileID[0] : profileID;
  const user = useUser(id);
  return (
    <Wrapper>
      <ProfileImage onClick={handleChangeIsEdit}>
        {user?.image && <Image src={user.image} />}
      </ProfileImage>
      <Info profileID={id} />
    </Wrapper>
  );
};

export default User;
