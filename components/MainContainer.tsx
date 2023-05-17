import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import NavBar from './NavBar';
import NavBarMobile from './NavBarMobile';

const Global = createGlobalStyle` 
*{  
  padding: 0;
  margin: 0;
  border: 0;
  font-weight: 500;  
  body{
    background-color: #C5E4E7;    
  }
  font-family: 'Rubik Wet Paint', cursive;
  
  ::-webkit-scrollbar {
    border-radius: 10px;
    background-color: #88b4b7;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1d7b81;
    border-radius: 5px;
  }
}
*,*:before,*:after{
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
 :focus,:active{outline: none;}
 a:focus,a:active{outline: none;}
 nav,footer,header,aside{display: block;}
 input::-ms-clear{display: none;}
 button{cursor: pointer;}
 button::-moz-focus-inner {padding:0;border:0;}
 a, a:visited{text-decoration: none;}
 a:hover{text-decoration: none;}
 ul li{list-style: none;}
 img{vertical-align: top;}
`;

interface Props {
  children: React.ReactNode;
  keywords: string;
  hideNavBar?: boolean;
}

const MainContainer: FC<Props> = ({ children, keywords, hideNavBar }) => {
  return (
    <>
      <Head>
        <meta name="keywords" content={keywords} />
        <title>TZ MINSK</title>
      </Head>
      <Global />
      {!hideNavBar && <NavBar />}
      {!hideNavBar && <NavBarMobile />}
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
    </>
  );
};

export default MainContainer;
