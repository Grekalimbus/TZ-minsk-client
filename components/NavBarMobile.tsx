import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import localStorageService from '@/services/localStorage.service';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: none;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
  background: #00474b;
  transition: all 0.5s;
  @media (max-width: 700px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 30px;
  margin: auto;
  border-bottom: 4px solid white;
  border-top: 4px solid white;
  background: #00474b;
  cursor: pointer;
`;

const UL = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #00474b;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  background: #00474b;
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

const NavBarMobile = () => {
  const [hideNav, setHideNav] = useState(true);
  const userID = localStorageService.getUserId();
  const router = useRouter();
  const clearLocalStorage = () => localStorageService.deleteTokens();
  return (
    <Wrapper>
      <Menu onClick={() => setHideNav(!hideNav)}>
        <div style={{ background: 'white', width: '100%', height: '4px' }}></div>
      </Menu>
      <UL style={{ display: `${hideNav ? 'none' : 'block'}` }}>
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
        <Li>
          <Link onClick={clearLocalStorage} style={styleLink} href="/">
            Go Out
          </Link>
        </Li>
      </UL>
    </Wrapper>
  );
};

export default NavBarMobile;
