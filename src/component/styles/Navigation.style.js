import styled from 'styled-components';

export const NavBarStyled = styled.div`
  background-color: #1a1927;
  display: flex;
  flex-direction: row;
  flex-direction: row-reverse;
  flex-direction: column;
  padding: 15px 5px 10px 10px;
  color: white;
> p{
  
  padding: 0px 0px 0px 5px;
  font-size: small;
}
> .title{
  display: block;
  font-weight: bold;
  font-family: "Pacifico", cursive;
  margin: 0px 8px;
  color: white ;
  font-size: xx-large;
  height: auto;
  letter-spacing: 2px;
  > strong{
    font-family: "Pacifico", cursive;
    letter-spacing: 2px;
  }
}
> ul li{
  
  padding: 0px 8px;
}
`;

export const PlayBtn = styled.div`{
  height: 6px;
  width: 6px;
  position: absolute;
  bottom: 2px;
  margin-left: 11;
  margin-bottom: 14;
  
}`;