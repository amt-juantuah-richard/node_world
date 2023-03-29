import { KeyboardBackspace } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation  } from 'react-router-dom';


const Container = styled.div`
    padding: 45px 80px;
    & a {
        display: contents;
        cursor: pointer;
    }
    @media screen and (max-width: 480px) {
        padding: 40px 28px;
    }
`;

const BackButton = styled.button`
    display: flex;
    flex-flow: row;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    background: var(--color-elements);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.293139);
    border-radius: 6px;
    width: 136px;
    height: 40px;
    outline: none;
    border: none;
    gap: 10px;
    & a {
        display:contents;
    };
    &:hover {
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
    };
    @media screen and (max-width: 480px) {
        width: 104px;
        height: 32px;
        border-radius: 2px;
    }
`;

const Word = styled.p`
    font-size: 16px;
    margin-bottom: 10px
    @media screen and (max-width: 480px) {
        font-size: 14px;
    }
`;

const DetailBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    gap: 80px;
    margin-top: 65px;
    @media screen and (max-width: 480px) {
        gap: 40px;
        margin-top: 45px;
    }
`;

const ImageBox = styled.div`
    width: 520px;
    border-radius: 6px;
    height: 340px;
    @media screen and (max-width: 480px) {
        width: 320px;
        height: 229px;
        border-radius: 4px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 6px;
    @media screen and (max-width: 480px) {
        border-radius: 4px;
    }
`;

const WordBox = styled.div`
    width: 540px;
    height: auto;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 480px) {
        padding-top: 0px;
        padding-bottom: 0px;
    }
`;

const Title = styled.h1`
    margin-bottom: 15px;
    font-weight: 800;
    @media screen and (max-width: 480px) {
        font-size: 22px;
        line-height: 30px;
    }
`;

const Summary = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
    & ${Word} {
        margin-bottom: 15px;
    }
    @media screen and (max-width: 480px) {
        height: auto;
    }
`;

const MainSummary = styled.div`
    display: flex;
    flex-direction: column;
`;

const OtherSummary = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 480px) {
        margin-top: 20px;
    }
`;

const Neighbours = styled.div`
    height: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    @media screen and (max-width: 480px) {
        margin-top: 32px;
        margin-bottom: 100px;
        gap: 20px;
    }
`;

const NeighbourButtoms = styled.div`
    height: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const NeighbourButtom = styled.button`
    display: block;
    background: var(--color-elements);
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.293139);
    border-radius: 4px;
    transition: all 0.3s;
    height: 28px;
    width: 96px;
    outline: none;
    border: none;
    &:hover {
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.293139);
    };
    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
`;

const Detail:React.FC = () => {

    const location = useLocation();
    const capital = location.pathname.split("/")[1];
    const country = location.state.country;
    const codes = location.state.namecodes;
  return (
    <Container>
        <Link to="/"><BackButton>
            <KeyboardBackspace />
            <Word>Back</Word>
        </BackButton></Link>
        <DetailBox>
            <ImageBox><Image src={country.flags.png} alt='country flag'/></ImageBox>
            <WordBox>
                <Title>{country.name.common}</Title>
                <Summary>
                    <MainSummary>
                        <Word><b>Native Name: </b> {country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</Word>
                        <Word><b>Population: </b> {country.population}</Word>
                        <Word><b>Region: </b> {country.region}</Word>
                        <Word><b>Sub Region: </b> {country.subregion}</Word>
                        <Word><b>Capital: </b> {country.capital}</Word>
                    </MainSummary>
                    <OtherSummary>
                        <Word><b>Top Level Domain: </b> {country.tld}</Word>
                        <Word><b>Currency: </b> {country.currencies[Object.keys(country.currencies)[0]].name}</Word>
                        <Word><b>Languages: </b> {Object.values(country.languages).join(", ")}</Word>
                    </OtherSummary>
                </Summary>
                {country.borders && <Neighbours>
                        <b>Border Countries: </b>
                            <NeighbourButtoms>
                                { 
                                        country.borders.map((item:any, index:number) => (
                                            <NeighbourButtom key={index}>{codes[item]}</NeighbourButtom>
                                        ))
                                }
                            </NeighbourButtoms>
                    </Neighbours>}
            </WordBox>
        </DetailBox>
    </Container>
  )
}

export default Detail