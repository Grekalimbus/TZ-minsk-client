import React from 'react';
import styled from 'styled-components';
import MainContainer from '@/components/MainContainer';

const Title = styled.p`
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  color: #00474b;
  text-shadow: 0px 9px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const WrapperImage = styled.div`
  width: 40%;
  height: 20%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  @media (max-width: 1200px) {
    width: 50%;
    height: 30%;
  }
  @media (max-width: 900px) {
    width: 70%;
    height: 50%;
  }
  @media (max-width: 700px) {
    width: 95%;
    height: 75%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Themas = () => {
  return (
    <MainContainer keywords="Themas">
      <Title>
        By next week I want to please you with a new update. You can choose a different theme and
        switch between light and dark. If users appreciate this update, we can continue to delight
        you with new additions to our project.
      </Title>
      <WrapperImage>
        <Image src="https://i.postimg.cc/xj52rBWX/1.png"></Image>
      </WrapperImage>
    </MainContainer>
  );
};

export default Themas;
