import React, { ReactElement, useState } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { ReactComponent as Edit } from 'Assets/Edit.svg';
import H from 'Atoms/Text/H';
import { useQuery } from 'react-query';
import { getUserInfo } from 'API/User';
import P from 'Atoms/Text/P';
import moment from 'moment';
import EditUserInfoModal from 'Molecules/Modal/EditUserInfoModal';
import UserImage from 'Atoms/UserImage';

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

  const onChangeActionMenu = (option: ActionMenuOption): void => {
    if (option.value === 'edit') {
      setIsOpen(true);
    }
  };

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
        displayName={data?.displayName}
        profileImageId={data?.profileImage?.id}
        userInfoRefetch={refetch}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </CardStyled>
  );
};

export default UserCard;
