import {useState, useEffect} from "react";
import styled from "styled-components";

import "./index.css";

import {colors} from "./colors.js";

// components
import NumInput from "./components/NumInput";
import KeyboardRender from "./components/KeyboardRender";

export function App() {

  const [keyboard_data, set_keyboard_data] = useState(
    {
      num_columns:1,
      columns:{
        0:{
          num_rows:1,
          stagger:0,
          spacing:0,
        },
      },
    }
  )

  function setColumns(num){
    var temp_data = Object.create({});
    temp_data = Object.assign(temp_data,keyboard_data);
    temp_data.num_columns = num > 0 ? num : 1;

    for(let n = 0; n < num; n+= 1){
      if(temp_data.columns[n]==null){
        temp_data.columns[n] = {
          num_rows:1,
          stagger:0,
          spacing:0,
        }
      }
    }

    Object.entries(temp_data.columns).map((col)=>{
      num = parseInt(col[0])
      if(num > temp_data.num_columns-1){
        delete temp_data.columns[num]
      }
    })

    set_keyboard_data(temp_data);
  }

  function setColumnData(col,name,num,min){
    if(isNaN(num)){return}
    if(num < min){num = min;}
    var temp_data = Object.create({});
    temp_data = Object.assign(temp_data,keyboard_data);
    temp_data.columns[col][name] = num;
    set_keyboard_data(temp_data);
  }

  return(
  <MainContainer>
    <TopBar>
      <Title>Keyboard Generator</Title>
    </TopBar>
    <MainContent>
      <TopSection 
        title="columns" 
        keyboard_data={keyboard_data}
        setData={setColumnData}
        setData2={setColumns}
      />
      <KeyboardRender keyboard_data={keyboard_data}/>
    </MainContent>
  </MainContainer>
  );
}

function TopSection({title,keyboard_data,setData,setData2}){
  return(
    <TopSectionStack>
      <TopSectionTitleBar>
        <TopSectionTitle>{title}</TopSectionTitle>
        <HFill/>
        {keyboard_data.num_columns > 1 &&
          <TopSectionRemoveButton onClick={()=>{setData2(keyboard_data.num_columns-1)}}>
            -
          </TopSectionRemoveButton>
        }
        <TopSectionAddButton onClick={()=>{setData2(keyboard_data.num_columns+1)}}>
          +
        </TopSectionAddButton>
      </TopSectionTitleBar>
      <TopSectionDiv>
        {Object.entries(keyboard_data.columns).map((c,i)=>{
          col = c[1]
          function setNumRows(num){setData(i,"num_rows",num,1)}
          function setStagger(num){setData(i,"stagger",num)}
          function setSpacing(num){setData(i,"spacing",num)}
          return(
            <OptionGroup>
              <OptionGroupTitle>Column {i+1}</OptionGroupTitle>
              <NumInput
                name="rows"
                value={col.num_rows}
                setValue={setNumRows}
              />
              <NumInput
                name="stagger"
                value={col.stagger}
                setValue={setStagger}
              />
              <NumInput
                name="spacing"
                value={col.spacing}
                setValue={setSpacing}
              />
            </OptionGroup>
          )
        })}
      </TopSectionDiv>
    </TopSectionStack>
  )
}

function AddRemoveColumn({keyboard_data,setData2}){
  return(
    <>
    </>
  )
}

const MainContainer = styled.div`
  background:${colors.bg_sec};  
  display:flex;
  flex-direction:column;
  height:100vh;
  overflow-y:auto;
  overflow-x:hidden;
`;

const TopBar = styled.div`
  background:${colors.bg_sec};  
  display:inline-flex;
  align-items:center;
  padding-top:1.5em;
  padding-bottom:1.5em;
`;

const Title = styled.p`
  margin-left:0.75em;
  font-size:2em;
`;

const TopBarText = styled.p`
  font-size:1em;
  margin-right:1em;
`;

const HFill = styled.div`
  flex-grow:1;
`;

const MainContent = styled.div`
  flex-grow:1;
  font-size:1.5em;
`;

const TopSectionStack = styled.div`
  background:${colors.bg_main};
  display:flex;
  flex-direction:column;
`;

const TopSectionDiv = styled.div`
  height:100%;
  display:inline-flex;
  align-items:center;
  overflow:auto;
`;

const TopSectionTitleBar = styled.div`
  display:inline-flex;
  align-items:center;
  padding:0.25em;
  background:grey;
  font-size:1.25em;
`;

const TopSectionTitle = styled.p``;

const OptionGroup = styled.div`
  background:${colors.bg_main};
  padding:0.25em;
  display;flex;
  flex-direction:column;
  border:0.1em solid white;
  margin:0.25em;
`;

const OptionGroupTitle = styled.p`
  text-align:center;
  margin-bottom:0.5em;
  font-size:0.8em;
`;

const TopSectionAddButton = styled.button`
  width:2em;
  height:2em;
  border:none;
  background:${colors.button_add};
  &:hover{
    background:${colors.button_add_hover};
  }
  &:pressed{
    background:${colors.button_add_pressed};
  }
`;

const TopSectionRemoveButton = styled(TopSectionAddButton)`
  background:${colors.button_remove};
  &:hover{
    background:${colors.button_remove_hover};
  }
  &:pressed{
    background:${colors.button_remove_pressed};
  }
  margin-right:1em;
`;

