import styled from "styled-components";

import {colors} from "../colors.js";

export default function NumInput({name,value,setValue,colors}){
  colors = colors;
  return(
    <InputContainer>
      <TitleBlock>{name}</TitleBlock>
      <CounterBlock>
        <IncrementButton onClick={()=>{setValue(value-1)}}>-</IncrementButton>
        <ValueText
          value={value}
          onChange={(e)=>{setValue(parseInt(e.target.value))}}
          type="number"
        />
        <IncrementButton onClick={()=>{setValue(value+1)}}>+</IncrementButton>
      </CounterBlock>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display:flex;
  flex-direction:column;
  height:2.5em;
`;

const TitleBlock = styled.div`
  background:${colors.bg_sec};
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  height:50%;
  width:100%;
  font-size:0.75em;
`;

const CounterBlock = styled.div`
  display:flex;
  flex-direction:row;
  height:50%;
  width:100%;
`;

const IncrementButton = styled.button`
  width:2em;
  background:${colors.button};
  border:none;
  color:white;
  font-size:0.6em;
  text-align:center;
  &:hover{
    background:${colors.button_hover};
  }
  &:pressed{
    background:${colors.button_hover};
  }
`;

const ValueText = styled.input`
  background:white;
  color:black;
  font-size:0.75em;
  font-family:inherit;
  width:2.5em;
  text-align:center;
  border:none;
`;
