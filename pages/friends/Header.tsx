import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { FriendsTransformType } from '@/hooks/useFriend';

const Button = styled.button`
  width: 150px;
  height: 35px;
  margin-left: 3%;
  border: 2px solid #7c898a;
  background: #ffffff;
  color: #7c898a;
  border-radius: 4px;
  @media (max-width: 600px) {
    width: 25%;
  }
  @media (max-width: 420px) {
    width: 31%;
    font-size: 12px;
  }
`;

const InputSearch = styled.input`
  width: 430px;
  height: 44px;
  margin-top: 10px;
  padding-left: 15px;
  background: #eeeeee;
  border: 2px solid #969393;
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 420px) {
    width: 98%;
  }
`;

const Image = styled.img`
  display: inline-block;
  margin-top: 10px;
  margin-left: 30px;
  background: 0;
  @media (max-width: 600px) {
    display: none;
  }
`;

interface PropsButton {
  marginLeft: string;
  border: string;
  color: string;
}

interface Props {
  friends: FriendsTransformType;
  userTag: string;
  handleChangeUserTag: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeActive: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Header: FC<Props> = ({ friends, userTag, handleChangeUserTag, handleChangeActive }) => {
  const [active, setActive] = useState('1');
  const getStylesButton = (active: string, id: string): PropsButton | undefined => {
    if (active === id) {
      return {
        marginLeft: `${id === '1' ? '0px' : '3%'}`,
        border: '2px solid #00474B',
        color: '#00474B',
      };
    } else if (active !== id) {
      return {
        marginLeft: `${id === '1' ? '0px' : '3%'}`,
        border: '2px solid #7C898A',
        color: '#7C898A',
      };
    }
  };
  return (
    <div>
      <Button
        onClick={(e) => [handleChangeActive(e), setActive('1')]}
        id="1"
        style={getStylesButton(active, '1')}
      >
        All Users
      </Button>
      <Button
        onClick={(e) => [handleChangeActive(e), setActive('2')]}
        id="2"
        style={getStylesButton(active, '2')}
      >
        Followers ({friends?.followers?.length})
      </Button>
      <Button
        onClick={(e) => [handleChangeActive(e), setActive('3')]}
        id="3"
        style={getStylesButton(active, '3')}
      >
        Following ({friends?.following?.length})
      </Button>
      <InputSearch
        value={userTag}
        onChange={(e) => handleChangeUserTag(e)}
        placeholder="Search User"
      ></InputSearch>
      <Image src="https://i.postimg.cc/DyNw9g5G/magnifier-1-icon-icons-1.png"></Image>
    </div>
  );
};

export default Header;
