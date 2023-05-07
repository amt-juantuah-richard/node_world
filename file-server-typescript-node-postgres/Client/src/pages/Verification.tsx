import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {UserContext} from '../AuthContext';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ArrowBackIosNew } from '@mui/icons-material';
import { baseUniformRL } from '../variables';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Word = styled.span`
    text-align: center;
    margin: 18px auto;
    font-weight: 600;
    font-size: 14px;
`;


const Button = styled.button`
    color: #eeeeee;
    background-color: #04a7c4;
    border-radius: 5px;
    height: 35px;
    width: 100%;
    outline: none;
    font-size: 14px;
    margin-top: 5px;
    border: none;
    cursor: pointer;
    &:hover {
        border: 2px solid #eeeeee;
        opacity: 0.8;
    }
`;

const GoHome = styled.div` 
    position: absolute;
    top: 30px;
    left: 20px;
    &:hover {
        opacity: 0.8;
    }
`;

const Error = styled.p`
    color: red;
`;

const SuccessMessage = styled.div`
    height: auto;
    width: 250px;
    margin: 10px auto;
    padding: 10px;
    color: green;
    background-color: #000;
    border-radius: 5;
    display: flex;
    flex-flow: column;
    font-family: monospace;
    align-items: center;
    justify-content: center;
`;

const FailureMessage = styled.div`
    height: auto;
    width: 250px;
    margin: 10px auto;
    padding: 10px;
    color: red;
    background-color: #000;
    border-radius: 5;
    display: flex;
    flex-flow: column;
    font-family: monospace;
    align-items: center;
    justify-content: center;
`;

const Verification:React.FC = () => {
    const { username, email, token } = useParams();
    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);
    const [success, setSuccess] = useState('');
    const [failure, setFailure] = useState('');

    useEffect(() => {
        console.log(username, email, token);
    }, [])


  return (
    <Container>
        <GoHome>
            <Link to='/'><ArrowBackIosNew /></Link>
        </GoHome>
        { username } { email } {token }
        
        
    </Container>
  )
}

export default Verification