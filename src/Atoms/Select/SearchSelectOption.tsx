import React, { ReactElement } from 'react';
import { OptionProps, components } from 'react-select';
import { SearchSelectOption as SearchSelectOptionType } from 'Types/Select';
import styled from 'styled-components/macro';
import P from 'Atoms/Text/P';
import Image from 'Atoms/Image';

const { Option } = components;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;

  & > svg {
    width: 30px;
    height: 30px;
    fill: ${props => props.theme.colors.text.primaryDarker};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 10px;
`;

const ImageStyled = styled(Image)`
  width: 30px;
  height: 30px;
`;

const SearchSelectOption = (props: OptionProps<SearchSelectOptionType>): ReactElement => {
  const { Icon, label, type } = props.data as SearchSelectOptionType;

  const getSubTitle = (): string => {
    switch (type) {
      case 'page': {
        return 'Page';
      }
      case 'collection': {
        return 'Collection';
      }
      case 'record': {
        return 'Record';
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const never: never = type;
        return '';
      }
    }
  };

  return (
    <Option {...props}>
      <OptionContainer>
        <ImageContainer>
          {typeof Icon === 'string' ? <ImageStyled src={`data:image;base64,${Icon}`} /> : <Icon />}
        </ImageContainer>
        <ContentContainer>
          <P fontSize="normal" fontWeight="semiBold" color="primaryDarker">
            {label}
          </P>
          <P fontSize="normal" fontWeight="light" color="primaryDarker">
            {getSubTitle()}
          </P>
        </ContentContainer>
      </OptionContainer>
    </Option>
  );
};

export default SearchSelectOption;
