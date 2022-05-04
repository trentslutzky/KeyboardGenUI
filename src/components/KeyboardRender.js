import styled from "styled-components";

export default function KeyboardRender({keyboard_data}){
  return(
    <Keeb> 
      <Columns>
        {Object.entries(keyboard_data.columns).map((c,i_c)=>{
          const col = c[1]
          return(
            <Column col={col}>
              {[...Array(col.num_rows)].map((n,i_n)=>(
                <Key>
                  <p>[{i_c},{i_n}]</p>
                </Key>
              ))}
            </Column>
          )
        })}
      </Columns>
      <HFill/>
      <ColumnsM>
        {Object.entries(keyboard_data.columns).map((c,i)=>{
          const col = c[1]
          return(
            <Column col={col}>
              {[...Array(col.num_rows)].map((n,i)=>(
                <Key/>
              ))}
            </Column>
          )
        })}
      </ColumnsM>
    </Keeb>
  );
}

const Keeb = styled.div`
  width:100%;
  display:inline-flex;
`;

const HFill = styled.div`flex-grow:1;`;

const Columns = styled.div`
  display:-webkit-inline-box;
  padding:1em;
`; 

const ColumnsM = styled.div`
  display:-webkit-inline-box;
  padding:1em;
  transform: scaleX(-1);
`;

const Column = styled.div`
  margin-top:${props=>props.col.stagger*4}px;
`; 

const Key = styled.div`
  width:72px;
  height:72px;
  margin-right:2px;
  margin-bottom:2px;
  border:2px solid white;
  font-size:0.5em;
  color:grey;
`;
