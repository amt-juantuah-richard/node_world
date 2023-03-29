import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 255px;
    height: 336px;
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
    background-color: red;
    width: 255px;
    height: 160px;
    border-radius: 5px 5px 0 0;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
`;

const About = styled.div`
    width: 100%;
    padding-top: 24px;
    padding-left: 24px;
    height: calc(100% - 160px);
`;

const SubTitle = styled.h3`
    margin-bottom: 16px;
`;

const WordBox = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 64px;
`;

const Words = styled.p``;

type Props = {
    country: {
        [index: string]:any;
    };
    namecodes: {
        [index: string]:string;
    }
}


const Country:React.FC<Props> = props => {
    const { country, namecodes } = props;
  return (
    <Link to={`/${country.capital}`}
          state={{country, namecodes}}
    >
    <Container>
        <Flag>
            <Image src={ country.flags.png} />
        </Flag>
        <About>
            <SubTitle>{ country.name.common}</SubTitle>
            <WordBox>
                <Words><b>Population: </b> { country.population}</Words>
                <Words><b>Region: </b> { country.region}</Words>
                <Words><b>Capital: </b> { country.capital}</Words>
            </WordBox>
        </About>
    </Container>
    </Link>
  )
}

export default Country