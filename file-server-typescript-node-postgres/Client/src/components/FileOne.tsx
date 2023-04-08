import React, { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../AuthContext';


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
    flex-flow: column;
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
    transition: all 500ms;
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

const NotifBox = styled.div`
    display: flex;
    transition: all 400ms;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -35px;
    z-index: 2;
    border: 1px solid #04a7c4;
    background-color: #17c404;
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

const Fname = styled(Words)`
    font-style: italic;
    font-weight: 12px;
    font-family: monospace;
`

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
    const [mailerNotification, setmailerNotification] = useState('none');
    const [reciever, setReciever] = useState('');
    const [downs, setDowns] = useState(parseInt(docFile.downloads));
    const [format, setFormat] = useState(<GrDocument />)
    const {user} = useContext(UserContext);

    const handleMailDeckOpener = () => {
        setMailer(mailer === 'none' ? 'flex' : 'none');
    }

    
    
    useEffect(() => {
        const formatString = docFile.file_format.split("/")[1];
        setFormat( 
            formatString === 'pdf' ? <GrDocumentPdf />
         : ['doc', 'docx', 'ods', 'odt'].includes(formatString) ? <GrDocumentWord />
         : ['xls', 'xlsx'].includes(formatString) ? <GrDocumentExcel />
         : ['ppt', 'pptx'].includes(formatString) ? <GrDocumentPpt />
         : ['txt', 'plain'].includes(formatString) ? <GrDocumentTxt />
         : ['twxt'].includes(formatString) ? <GrDocumentText />
         : ['jpeg', 'jpg', 'png', 'gif'].includes(formatString) ? <GrDocumentImage />
         : <GrDocument />
        )
    }, [])
    
    
    const handleDownload = async () => {
        try {
            const {data} = await axios.post(`http://13.50.13.83:5000/api/v1/files/download`, { file_name: docFile.file_name}, 
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

    const handleMailer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const recieverValue = reciever;
        setReciever("");
        try {
            const { data } = await axios.post("http://13.50.13.83:5000/api/v1/files/mailer", {
                username: user?.username,
                fileName: docFile.file_name,
                senderEmail: user?.email,
                receiverEmail: recieverValue,
            }); 
            
            if (data) {
                setMailer('none');
                setmailerNotification('flex');
                setTimeout(() => {
                    setmailerNotification('none');
                }, 10000)
            }
            else alert("An Error Occurred Try sending again!!")
        } catch (error: any) {
            console.log(error)
            if (error.response.data.stack.includes('dns')) {
                alert('Check your internet connection. If issue persists, server might be down')
            }
        }
    }


  return (
    
    <Container>
        <Flag>
            {format}
            <Fname>{ docFile.file_name}</Fname>
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
                    <Button style={{border: '1px solid #f22d2d'}} onClick={handleMailDeckOpener}>{mailer === 'none' ? "Open" : "Close"} Mail Deck</Button>
                </ButtomDiv>
            </WordBox>
            <MailBox style={{display: `${mailer}`}}>
                <Email  type='email' name='email' value={reciever} onChange={(e) => setReciever(e.target.value)} placeholder="Send to which Email Address?"/>
                <MailSend type='submit' disabled={ reciever.length ? false : true} onClick={handleMailer}>
                    <Send />
                </MailSend>
            </MailBox>
            <NotifBox style={{display: `${mailerNotification}`}}>Success: Email Sent</NotifBox>
        </About>
    </Container>
  )
}

export default File;