import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GrDocumentPdf } from 'react-icons/gr';
import { Send } from '@mui/icons-material';

const Container = styled.div`
    width: 255px;
    height: 160px;
    border: 1px solid #04a7c4;
    background-color: var(--color-elements);
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.0294384);
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.384);
    }
`;

const Flag = styled.div`
    background-color: #04a7c4;
    width: 255px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0 0;
`;

const About = styled.div`
    width: 100%;
    padding: 5px;
    height: calc(100% - 60px);
    position: relative;
`;

const MailBox = styled.form`
    display: flex;
    transition: all 400ms;
    flex-flow: row;
    justify-content: space-between;
    height: 30px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -35px;
    z-index: 2;
    border: 1px solid #04a7c4;
    border-radius: 5px;
`;

const MailSend = styled.button`
    height: 30px;
    width: 30%;
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
`;

const Email = styled.input`
    width: 70%;
    height: 100%;
    padding: 3px;
    background: none;
    border: none;
    outline: none;
    padding-left: 10px;
    border-right: 1px solid #04a7c4;
    &::placeholder {
        color: #C4C4C4;
        font-size: 12px;
    }
`;

const WordBox = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 5px;
    position: relative;
`;

const Words = styled.p`
    height: 30px;
    overflow: hidden;
`;

const ButtomDiv = styled.div`
    width: 100%;
    height: 28px;
    display: flex;
    flex-flow: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
`;

const Button = styled.button`
    border-radius: 5px;
    background: none;
    height: 28px;
    width: 48%;
    font-size: 14px;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
        background-color: red;
        color: #fff;
    }
`;

type Props = {
    docFile: {[key: string]:any};
}


const File:React.FC<Props> = props => {
    const { docFile } = props;
    const [mailer, setMailer] = useState('none');

    const handleSendMail = () => {
        setMailer(mailer === 'none' ? 'flex' : 'none');
    }

    let format;
    switch (docFile.file_format.split("/")[1]) {
        case 'pdf':
            format = <GrDocumentPdf />;
            break;
        default:
            format = docFile.file_format.split("/")[1]
    }

    const handleDownload = () => {
        const newAnchorTag = document.createElement('a')
        newAnchorTag.href = docFile.file_url;
        newAnchorTag.download = docFile.file_url.split("/").pop();
        document.body.appendChild(newAnchorTag);
        newAnchorTag.click();
        document.body.removeChild(newAnchorTag);
    }

  return (
    
    <Container>
        <Flag>
            {format}
        </Flag>
        <About>
            <WordBox>
                <Words><b>Title: </b> { docFile.file_title}</Words>
                <Words><b>Description: </b> { docFile.file_description }</Words>
                <ButtomDiv>
                    <Button onClick={handleDownload} style={{border: '1px solid #edf420'}} >Download</Button>
                    <Button style={{border: '1px solid #f22d2d'}} onClick={handleSendMail}>{mailer === 'none' ? "Open" : "Close"} Mail Deck</Button>
                </ButtomDiv>
            </WordBox>
            <MailBox style={{display: `${mailer}`}}>
                <Email type='email' placeholder="Send to which Email Address?"/>
                <MailSend>
                    <Send />
                </MailSend>
            </MailBox>
        </About>
    </Container>
  )
}

export default File;