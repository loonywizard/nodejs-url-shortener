import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 700px;
  height: 40px;
`

const StyledInput = styled.input`
  flex-grow: 1;
  border-radius: 5px 0 0 5px;
  border: 1px solid #008ae6;
  padding: 10px 15px;
  outline: none;

  &:active, &:focus {
    box-shadow: inset 0px 0px 0px 1px #008ae6;
  }
`

const StyledButton = styled.button`
  border-radius: 0 5px 5px 0;
  border: none;
  padding: 10px 30px;
  background-color: #008ae6;
  color: white;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    background-color: #007acc;
  }
`

export {
  StyledForm,
  StyledInput,
  StyledButton,
}