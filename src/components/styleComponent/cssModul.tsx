import React, { useState } from 'react';
import styled from 'styled-components';
import styles from './StyleModul.module.scss';

const Component1 = () => {
  const [state, setState] = useState(false);
  return (
  //   <div className={`${styles.main} ${state ? styles.size : styles.size__min}`} onClick={() => setState(!state)}>
  //     Hello
  //   </div>
  // );
    <StyledWrapper onClick={() => setState(!state)} status={state}>
      
      <StyledH1>Hello</StyledH1>

      <h2 className="main__title">Hello 222</h2>
    </StyledWrapper>
  )
}

type StylesProps = {
  status: boolean;
}

export const StyledWrapper = styled.div<StylesProps>`
  background-color: red;
  height: ${props => props.status ? 400 : 100}px;

  .main {

    &__title {
      color: white;
    }
  }
`;

const StyledH1 = styled.h1`
  color: green;
`;

export default Component1;
