import ReactSelect from 'react-select';
import styled from 'styled-components/macro';

type Props = {
  classNamePrefix: string;
  showSearch?: boolean;
};

const SelectStyle = styled(ReactSelect)<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight.regular};
  color: ${props => props.theme.colors.text.primaryDark};
  font-size: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 18px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
  }

  .${props => props.classNamePrefix}__control {
    background-color: ${props => props.theme.colors.background.primary};
    border: none;
    box-shadow: none;
  }

  .${props => props.classNamePrefix}__indicator-separator {
    display: none;
  }

  .${props => props.classNamePrefix}__search-icon {
    ${props => !props.showSearch && 'display: none'};
    fill: ${props => props.theme.colors.text.primaryDark};
    width: 25px;
  }

  .${props => props.classNamePrefix}__dropdown-indicator {
    color: ${props => props.theme.colors.text.primaryDark};
  }

  .${props => props.classNamePrefix}__option {
    background-color: ${props => props.theme.colors.background.primary};
    cursor: pointer;
    letter-spacing: -0.8px;
    color: ${props => props.theme.colors.text.primaryDarker};
  }

  .${props => props.classNamePrefix}__option, .${props => props.classNamePrefix}__placeholder {
    letter-spacing: -0.8px;
  }

  .${props => props.classNamePrefix}__option--is-focused {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }

  .${props => props.classNamePrefix}__menu {
    overflow: hidden;
    background: ${props => props.theme.colors.background.primary};

    z-index: 100;
  }
`;

export default SelectStyle;
