import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import fileDownload from 'js-file-download';
import { 
    GrDocumentPdf, 
    GrDocumentPpt, 
    GrDocumentWord,
    GrDocumentTxt,
    GrDocumentExcel,
    GrDocumentText,
    GrDocument,
    GrDocumentImage,
    GrDownload
} from 'react-icons/gr';
import { Send } from '@mui/icons-material';


const Container = styled.div`
    width: 255px;
    height: 160px;
    border: 1px solid #04a7c4;
    background-color: var(--color-elements);
    box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.0294384);
    border-radius: 5px;
    transition: all 0.3s;
    position: relative;
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
    position: relative;
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

const Downs = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 2px;
    width: auto;
    height: 20px;
    display: flex;
    flex-flow: row;
    gap: 2px;
    padding: 3px;
    border-radius: 5px 0 3px 0;
    background-color: #04c467;
    & p {
        color: red;
        font-size: 12px;
        font-family: monospace;
    };
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
    const [downs, setDowns] = useState(parseInt(docFile.downloads));

    const handleSendMail = () => {
        setMailer(mailer === 'none' ? 'flex' : 'none');
    }

    

    let format;
    const formatString = docFile.file_format.split("/")[1]
     if (formatString) {
        if (formatString === 'pdf') {
            format = <GrDocumentPdf />;
        }            
        else if (['doc', 'docx', 'ods', 'odt'].includes(formatString)) {
            format = <GrDocumentWord />;
        }            
        else if (['xls', 'xlsx'].includes(formatString)) {
            format = <GrDocumentExcel />;
        }            
        else if (formatString ==='ppt' || 'pptx') {
            format = <GrDocumentPpt />;
        }            
        else if (formatString === 'txt') {
            format = <GrDocumentTxt />;
        }            
        else if (formatString === 'text') {
            format = <GrDocumentText />;
        }            
        else if (['jpeg', 'jpg', 'png', 'gif'].includes(formatString)) {
            format = <GrDocumentImage />;
        }            
        else {
            format = <GrDocument />;
        }
    }

    const handleDownload = async () => {
        try {
            const {data} = await axios.post(`http://localhost:5000/api/v1/files/download`, { file_name: docFile.file_name}, 
                {
                    responseType: "blob"
                }
            );

            if (data) {
                fileDownload(data, docFile.file_name);
                setDowns(downs + 1);
            }            
        } catch (error) {
            console.log(error)
        }
    }


  return (
    
    <Container>
        <Flag>
            {format}
            <Downs>
                <p>{ downs } downloads</p>
            </Downs>
        </Flag>
        <About>
            <WordBox>
                <Words><b>Title: </b> { docFile.file_title}</Words>
                <Words><b>Desc: </b> { docFile.file_description }</Words>
                <ButtomDiv>                
                    <Button onClick={handleDownload} style={{border: '1px solid #edf420'}} >Download <GrDownload /></Button>
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