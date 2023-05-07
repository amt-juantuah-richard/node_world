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
  gap: 40px;
`;

const Word = styled.span`
    text-align: center;
    margin: 18px auto;
    line-height: 24px;
    font-weight: 600;
    font-size: 14px;
`;


const Button = styled.button`
    color: #eeeeee;
    background-color: #04a7c4;
    border-radius: 5px;
    height: 35px;
    width: 300px;
    outline: none;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border: none;
    cursor: pointer;align-items: center;
    justify-content: center;
    display: flex;
    &:hover {
        border: 2px solid #eeeeee;
        opacity: 0.8;
        background-color: #0080008a;
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


const Box = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 8px;
    border: 2px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const Verification:React.FC = () => {
    const { username, email, token } = useParams();
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    const [failure, setFailure] = useState('');

    const getVerified = async () => {
        try { 

            const userData = await axios.put(`${baseUniformRL}/api/v1/users/verify`, { username, email, token });
            if (userData.data.ok) {
                setSuccess(`🥳 🎉 🎉 ${userData.data.message} 🎉 🎉 `);
            }
            else if (!userData.data.ok) setFailure(userData.data.message)
        } catch (error: any) {
            const msg: string = error.response.data.message;
            setFailure(msg || 'Verification failed');
        }
    }
    useEffect(() => {
        getVerified();
    }, []);

  return (
    <Container>
        { success ?
        <GoHome>
            <Link to='/'><ArrowBackIosNew /></Link>
        </GoHome> 
        : ""
        }
        <Box style={{
            backgroundColor: `${success.length && !failure.length ? '#0080008a' : !success.length && failure.length ? '#ff00002e' : ""}`
        }}><Word>{success.length && !failure.length ? success : !success.length && failure.length ? failure : "Please wait..."}</Word></Box>
        {
            success ?
            <Button>
                <Link to='/login'><ArrowBackIosNew />Login</Link>
            </Button> 
            : ""
        }
        
    </Container>
  )
}

export default Verification