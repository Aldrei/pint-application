import styled from 'styled-components'

export const ButtonStyle = styled.button`
  margin-bottom: 10px;
  height: 40px;
  min-height: 40px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.23);
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  ${props => props.color === 'blue' && `
    background-color: rgb(0, 127, 255);
    color: rgb(255, 255, 255);
  `}

  ${props => props.disabled && `
    cursor: not-allowed;
    opacity: 0.45;
  `}
`