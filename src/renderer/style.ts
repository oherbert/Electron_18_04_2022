import styled, { css } from 'styled-components';

const MainSection = styled.section`
  ${({ theme: { background } }) => css`
    display: inline-block;
    height: 99.5vh;
    width: 100%;
    background: ${background};
    overflow: hidden;

    .div-main-body {
      display: flexbox;
      height: 100%;
      // background: orangered;
    }
    .div-main-context {
      width: 90%;
      height: 100%;
      overflow: auto;
    }
  `}
`;

export default MainSection;

/*
button {
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  appearance: none;
  font-size: 1.3rem;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: all ease-in 0.1s;
  cursor: pointer;
  opacity: 0.9;
}

button:hover {
  transform: scale(1.05);
  opacity: 1;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  height: fit-content;
  width: fit-content;
  margin: 10px;
}

a:hover {
  opacity: 1;
  text-decoration: none;
}

.Hello {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
*/
