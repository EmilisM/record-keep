import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import User from 'Assets/User.png';

const UserImageStyled = styled.img`
  width: 128px;
  height: 128px;

  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.border.primary};
`;

type Props = {
  className?: string;
  src?: string;
};

const UserImage = ({ className, src }: Props): ReactElement => (
  <UserImageStyled className={className} src={src ? `data:image;base64,${src}` : User} />
);

export default UserImage;
