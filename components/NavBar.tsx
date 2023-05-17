import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import localStorageService from '@/services/localStorage.service';
import { useRouter } from 'next/router';

const WrapperNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  background: #00474b;
  @media (max-width: 700px) {
    display: none;
  }
`;

const LeftNav = styled.div`
  display: flex;
  width: 60%;
  height: 40px;
  margin-left: 100px;
  background: #00474b;
  @media (max-width: 1300px) {
  }
  @media (max-width: 1200px) {
    margin-left: 60px;
  }
  @media (max-width: 900px) {
    margin-left: 40px;
  }
`;

const UL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: #00474b;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 100%;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.14);
  transition: all 0.5s;
  :hover {
    margin: 3px;
    background: rgba(255, 255, 255, 0.25);
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
  @media (max-width: 900px) {
    width: 23%;
  }
`;

const WrapperGoOut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 125px;
  height: 40px;
  margin-right: 100px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 3px;
  transition: all 0.5s;
  :hover {
    background: rgba(255, 255, 255, 0.25);
    border: 2px solid rgba(255, 255, 255, 0.35);
  }
  @media (max-width: 1200px) {
    margin-right: 60px;
  }
  @media (max-width: 900px) {
    width: 75px;
    margin-right: 40px;
  }
`;

const styleLink = {
  background: '0',
  color: 'white',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '700',
  fontSize: '14px',
};

const NavBar = () => {
  const userID = localStorageService.getUserId();
  const router = useRouter();
  const clearLocalStorage = () => localStorageService.deleteTokens();
  return (
    <WrapperNavBar>
      <LeftNav>
        <UL>
          <Li>
            <button style={styleLink} onClick={() => router.push(`/profile/${userID}`)}>
              Profile
            </button>
          </Li>
          <Li>
            <Link style={styleLink} href="/friends/Friends">
              Friends
            </Link>
          </Li>
          <Li>
            <Link style={styleLink} href="/createTodo/CreateTodo">
              Create Todo
            </Link>
          </Li>
          <Li>
            <Link style={styleLink} href="/themas/Themas">
              Themas
            </Link>
          </Li>
        </UL>
      </LeftNav>
      <WrapperGoOut>
        <Link style={styleLink} onClick={clearLocalStorage} href="/">
          Go Out
        </Link>
      </WrapperGoOut>
    </WrapperNavBar>
  );
};

export default NavBar;
