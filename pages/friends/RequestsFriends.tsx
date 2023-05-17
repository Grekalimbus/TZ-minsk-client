import React, { FC } from 'react';
import styled from 'styled-components';
import ItemFriend from './itemFriend/ItemFriend';
import { UserInfoType } from '@/types/userInfo';

const Wrapper = styled.div`
  width: 580px;
  height: 180px;
  margin: 0 auto;
  margin-top: 15px;
  padding: 2px 5px 0px 20px;
  border-radius: 10px;
  background: #ffffff;
  overflow: auto;
  @media (max-width: 600px) {
    width: 95%;
  }
  @media (max-width: 400px) {
    padding: 5px;
    height: 360px;
  }
`;

const Title = styled.h3`
  margin-bottom: 5px;
  background: 0;
`;

interface Props {
  requests: UserInfoType[] | null;
}

const RequestsFriend: FC<Props> = ({ requests }) => {
  return (
    <Wrapper>
      <Title>Friend requests</Title>
      {requests?.map((friend) => (
        <ItemFriend type="request" key={friend?._id} user={friend} image={friend?.image} />
      ))}
    </Wrapper>
  );
};

export default RequestsFriend;
