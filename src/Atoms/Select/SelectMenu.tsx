import React, { ReactElement } from 'react';
import { components, MenuProps, OptionTypeBase } from 'react-select';
import styled from 'styled-components/macro';

const { Menu } = components;

const MenuTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;

  background-color: ${props => props.theme.colors.background.secondaryDarker};
  color: ${props => props.theme.colors.text.primaryLight};
  font-weight: ${props => props.theme.font.fontWeight.light};
  font-style: italic;
  overflow: hidden;
`;

const SelectMenu = ({ children, ...props }: MenuProps<OptionTypeBase>): ReactElement => (
  <Menu {...props}>
    <>
      <MenuTitle className={`${props.selectProps.classNamePrefix}__menu-title`}>Results</MenuTitle>
      {children}
    </>
  </Menu>
);

export default SelectMenu;
