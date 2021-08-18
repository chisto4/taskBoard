import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './StyleModul.module.scss';
import './StyleModul.module.css';

import RegistrationLoginButton from '../registrationAndLoginButton/regLogButon'

const Component1 = () => {
  const [state, setState] = useState(false);
  return (
  //   <div className={`${styles.main} ${state ? styles.size : styles.size__min}`} onClick={() => setState(!state)}>
  //     Hello
  //   </div>
  // );
  <div className="navigateWrapper">
    <StyledWrapper onClick={() => setState(!state)} status={state}>
      
      <StyledH1>Task Board</StyledH1>

      <h2 className="main__title">Create your New work space</h2>

      <RegistrationLoginButton onClickLog={function (): void {
        throw new Error('Function not implemented.');
      } } onClickReg={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    </StyledWrapper>
    </div>
  )
}

type StylesProps = {
  status: boolean;
}

export const StyledWrapper = styled.div<StylesProps>`
  background-color: #d1b49c57;
  height: ${props => props.status ? 400 : 80}px;
  width: 100%;
  .main {

    &__title {
      color: white;
      margin-left: 1rem;
    }
  }
`;

const StyledH1 = styled.h1`
  color: #020202;
  margin-left: 2rem;
`;

export default Component1;
