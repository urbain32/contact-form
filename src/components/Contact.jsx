import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const MyForm = styled(FormGroup)({
  width: '50%',
  gap: 2,
  padding: 20,
  paddingTop: 20,
  margin: 'auto',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  ':hover': { boxShadow: '10px 2px 10px rgba(0,0,0,0.5)' },
});
const MyFormControl = styled(FormControl)({
  marginTop: 10,
  gap: 4,
});

export const Contact = () => {
  return (
    <>
      <h1>Contact Form</h1>
      <MyForm>
        <MyFormControl>
          <InputLabel>Full Name</InputLabel>
          <Input />
        </MyFormControl>
        <MyFormControl>
          <InputLabel>Email</InputLabel>
          <Input />
        </MyFormControl>
        <MyFormControl>
          <InputLabel>Phone number</InputLabel>
          <Input />
        </MyFormControl>
        <MyFormControl>
          <InputLabel>Address</InputLabel>
          <Input />
        </MyFormControl>
        <MyFormControl>
          <InputLabel>PIN</InputLabel>
          <Input />
        </MyFormControl>
        <Button
          variant='contained'
          color='secondary'
          sx={{ width: { xs: '100%', lg: '10%' }, marginTop: 5 }}
        >
          Submit
        </Button>
      </MyForm>
    </>
  );
};
