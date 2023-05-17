import React, { useEffect, useState } from 'react';
import MainContainer from '@/components/MainContainer';
import authService from '../../services/auth.service';
import styled from 'styled-components';
import Field from './Field';
import validator from '@/utils/validator';
import validatorConfig from '@/utils/validatorConfig';
import localStorageService from '@/services/localStorage.service';
import { useRouter } from 'next/router';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 440px;
  height: 60vh;
  margin: auto;
  margin-top: 10vh;
  padding: 10px;
  border-radius: 35px;
  background: #ffffff;
  @media (max-height: 600px) {
    height: 80vh;
  }
  @media (max-width: 650px) {
    height: 70vh;
  }
  @media (max-width: 450px) {
    width: 350px;
    height: 70vh;
    padding: 5px;
  }
  @media (max-width: 350px) {
    width: 95%;
    height: 90vh;
    margin-top: 10px;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 60%;
  margin-top: 25px;
  @media (max-height: 600px) {
    height: 70%;
  }
  @media (max-width: 650px) {
    height: 70%;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;

const FooterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 25%;
  width: 90%;
  @media (max-height: 600px) {
    height: 20%;
  }
  @media (max-width: 650px) {
    height: 20%;
  }
`;

const ButtonElement = styled.button`
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 3px;
  background: rgba(0, 71, 75, 0.83);
  color: white;
`;

const Title = styled.p`
  margin-top: 3px;
  color: #0d686d;
  cursor: pointer;
`;

export interface TypeForm {
  userTag: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const [value, setValue] = useState<TypeForm>({ userTag: '', email: '', password: '' });
  const [formState, setFormState] = useState<Boolean>(true);
  const [errors, setErros] = useState<TypeForm>({ userTag: '', email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    validate();
  }, [value]);

  const validate = () => {
    const errors = validator(value, validatorConfig);
    setErros(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = (formState: Boolean): Boolean => {
    if (formState) {
      if (!errors.userTag && !errors.email && !errors.password) {
        return true;
      }
      return false;
    } else {
      if (!errors.email && !errors.password) {
        return true;
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const changeFormState = () => {
    setFormState(!formState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!isValid(formState)) return;
      formState
        ? await authService.registration(value.userTag, value.email, value.password)
        : await authService.login(value.email, value.password);
      const userId = localStorageService.getUserId();
      if (localStorage.getItem('jwt-token') && userId) {
        setTimeout(() => {
          router.push(`/profile/${userId}`);
        }, 0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainContainer keywords="Login" hideNavBar={true}>
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <FieldWrapper>
          {formState && (
            <Field
              name="userTag"
              label="userTag"
              value={value.userTag}
              type="text"
              handleChange={handleChange}
              error={errors.userTag}
            />
          )}
          <Field
            name="email"
            label="email"
            value={value.email}
            type="text"
            handleChange={handleChange}
            error={errors.email}
          />
          <Field
            name="password"
            label="password"
            value={value.password}
            type="password"
            handleChange={handleChange}
            error={errors.password}
          />
        </FieldWrapper>
        <FooterForm>
          <ButtonElement>{`${formState ? 'SignUp' : 'SignIn'}`}</ButtonElement>
          <Title onClick={changeFormState}>{`${formState ? 'SignIn' : 'SignUp'}`}</Title>
        </FooterForm>
      </FormWrapper>
    </MainContainer>
  );
};

{
}

export default LoginForm;
