import React, { ReactElement, useState, useReducer, FormEvent } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import H from 'Atoms/Text/H';
import { useQuery, useMutation } from 'react-query';
import { getUserInfo, updateUserInfo } from 'API/User';
import P from 'Atoms/Text/P';
import moment from 'moment';
import EditUserInfoModal from 'Molecules/Modal/EditUserInfoModal';
import { reducer, stateInit } from 'State/UserData/UserData';
import UserImage from 'Atoms/UserImage';
import { UpdateUserInfo } from 'Types/User/User';
import { updateImage, createImage } from 'API/Image';

const CardStyled = styled(Card)`
  width: 100%;
  min-width: 300px;
  max-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`;

const CardHeader = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 4px 4px 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    to right,
    ${props => props.theme.colors.background.secondaryDark},
    ${props => props.theme.colors.background.secondaryDarkest}
  );
`;

const ActionMenuStyled = styled(ActionMenu)`
  position: absolute;
  top: 20px;
  right: 20px;

  &:hover {
    background-color: ${props => props.theme.colors.background.secondaryDarkLighter};
  }

  .action-menu__icon {
    fill: ${props => props.theme.colors.text.primaryLight};
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  width: 100%;
`;

const Field = styled.div`
  width: 100%;

  margin-top: 20px;
`;

const actionMenuOptions: ActionMenuOption[] = [
  {
    value: 'edit',
    label: 'Edit',
    Icon: Edit,
  },
];

type Props = {
  className?: string;
};

const UserCard = ({ className }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status, refetch } = useQuery('userInfo', getUserInfo);
  const [state, dispatch] = useReducer(reducer, data, stateInit);
  const [mutateUserInfo, { status: userInfoStatus }] = useMutation(updateUserInfo);
  const [mutateUpdateImage, { status: updateImageStatus }] = useMutation(updateImage);
  const [mutateCreateImage, { status: createImageStatus }] = useMutation(createImage);

  const onChangeActionMenu = (option: ActionMenuOption): void => {
    if (option.value === 'edit') {
      setIsOpen(true);
    }
  };

  const onSubmitImageData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { crop } = state;

    if (state.image) {
      const dataReq = {
        height: crop.height || 25,
        width: crop.width || 25,
        x: crop.x || 0,
        y: crop.y || 0,
        data: state.image.split(',')[1],
      };

      if (data?.profileImage?.id) {
        mutateUpdateImage({ ...dataReq, id: data.profileImage.id }).then(() => refetch());
      } else {
        mutateCreateImage(dataReq)
          .then(image => mutateUserInfo([{ op: 'add', path: '/imageId', value: image.id }]))
          .then(() => refetch());
      }

      dispatch({ type: 'UserData/Image', payload: null });
      dispatch({ type: 'UserData/Crop', payload: { x: 0, y: 0 } });
    }
  };

  const onSubmitProfileData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const updateRequest: UpdateUserInfo[] = [
      {
        op: 'add',
        path: '/displayName',
        value: state.displayName,
      },
    ];

    mutateUserInfo(updateRequest).then(() => refetch());
  };

  const onSubmitPasswordChange = (): void => {};

  return (
    <CardStyled className={className} isLoading={status === 'loading' && !data}>
      <CardHeader>
        <UserImage src={data?.profileImage?.data} />
        <ActionMenuStyled options={actionMenuOptions} onChange={onChangeActionMenu} />
      </CardHeader>
      <CardBody>
        <H level="2" fontSize="normal" fontWeight="semiBold" color="primaryDarker">
          {data?.displayName || data?.email}
        </H>
        {data?.displayName && (
          <Field>
            <H level="3" fontSize="normal" fontWeight="semiBold" color="primaryDarker">
              Email
            </H>
            <P fontSize="normal" fontWeight="regular" color="primaryDarker">
              {data.email}
            </P>
          </Field>
        )}
        <Field>
          <H level="3" fontSize="normal" fontWeight="semiBold" color="primaryDarker">
            Joined in
          </H>
          <P fontSize="normal" fontWeight="regular" color="primaryDarker">
            {data && moment(data.creationDate).format('YYYY-MM-DD')}
          </P>
        </Field>
      </CardBody>
      <EditUserInfoModal
        isLoading={userInfoStatus === 'loading' || updateImageStatus === 'loading' || createImageStatus === 'loading'}
        state={state}
        dispatch={dispatch}
        onSubmitProfile={onSubmitProfileData}
        onSubmitImageData={onSubmitImageData}
        onSubmitPasswordChange={onSubmitPasswordChange}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </CardStyled>
  );
};

export default UserCard;
