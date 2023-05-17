import React, { FC } from 'react';
import styled from 'styled-components';

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  text-align: center;
  border-radius: 2px;
  color: white;
  background: rgba(0, 71, 75, 0.83);
`;

const Error = styled.p`
  color: #fa0000;
`;

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

const Field: FC<Props> = ({ name, label, value, type, handleChange, error }) => {
  return (
    <FieldWrapper>
      <Label>{label}</Label>
      <Input type={type} name={name} value={value} onChange={(e) => handleChange(e)} />
      {error && <Error>{error}</Error>}
    </FieldWrapper>
  );
};

export default Field;
