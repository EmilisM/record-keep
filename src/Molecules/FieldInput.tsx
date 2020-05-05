import React, { ReactElement, useState, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components/macro';
import Input from 'Atoms/Input/Input';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import { ReactComponent as Checkmark } from 'Assets/Checkmark.svg';
import InvisibleButton from 'Atoms/Button/InvisibleButton';
import useClickOutside from 'Services/Hooks/useClickOutside';
import { useField } from 'formik';

type StyleProps = {
  isEditMode: boolean;
};

const ContainerStyled = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 6px 10px;
  width: 300px;
  margin-top: 10px;

  border: 1px solid ${props => (props.isEditMode ? props.theme.colors.text.primaryDarker : 'none')};
  border-radius: 4px;

  &:hover {
    background: ${props => !props.isEditMode && props.theme.colors.background.primaryDarker};
  }

  transition: background-color 300ms ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const EditStyled = styled(Edit)`
  width: 25px;
  height: 25px;

  cursor: pointer;

  fill: ${props => props.theme.colors.text.primaryDarker};
`;

const CheckmarkStyled = styled(Checkmark)`
  width: 25px;
  height: 25px;

  cursor: pointer;
`;

const InvisibleButtonStyled = styled(InvisibleButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputStyled = styled(Input)`
  padding: 0;
  border: none;

  width: 100%;
`;

type Props = {
  className?: string;
  placeholder?: string;
  name: string;
};

const FieldInput = ({ className, placeholder, ...rest }: Props): ReactElement => {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useClickOutside<HTMLDivElement>(() => setIsEditMode(false));
  const [field] = useField(rest);

  const onClick = (): void => {
    if (isEditMode) {
      setIsEditMode(false);
      inputRef.current?.blur();
    } else {
      setIsEditMode(true);
      inputRef.current?.focus();
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();

      setIsEditMode(false);
      inputRef.current?.blur();
    }
  };

  return (
    <ContainerStyled
      ref={ref}
      className={className}
      onClick={() => !isEditMode && setIsEditMode(true)}
      isEditMode={isEditMode}
    >
      <InputStyled
        fontSize="normal"
        color="primaryDarker"
        {...field}
        placeholder={placeholder}
        inputRef={inputRef}
        onKeyPress={onKeyPress}
      />
      <InvisibleButtonStyled onClick={onClick} type="button">
        {isEditMode ? <CheckmarkStyled /> : <EditStyled />}
      </InvisibleButtonStyled>
    </ContainerStyled>
  );
};

export default FieldInput;
