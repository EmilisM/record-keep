import React, { ReactElement, useState } from 'react';
import UserIcon from 'Assets/User.png';
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

type Props = {
  className?: string;
};

const CardStyled = styled(Card)`
  width: 100%;

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

const UserImageStyled = styled.img`
  width: 128px;
  height: 128px;

  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.border.primary};
`;

const ActionMenuStyled = styled(ActionMenu)<{ isOpen: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;

  background-color: ${props => props.isOpen && props.theme.colors.background.secondaryDarkLighter};

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
  padding: 10px;

  width: 100%;
  height: 100%;
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

const UserCard = ({ className }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (): void => {};
  const { data, status } = useQuery('userInfo', getUserInfo);

  return (
    <CardStyled className={className} isLoading={status === 'loading' && !data}>
      <CardHeader>
        <UserImageStyled src={UserIcon} />
        <ActionMenuStyled
          options={actionMenuOptions}
          onChange={onChange}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </CardHeader>
      <CardBody>
        <H level="2" fontSize="normal" fontWeight="semiBold" color="dashboardPrimary">
          {data?.displayName || data?.email}
        </H>
        {data?.displayName && (
          <Field>
            <H level="3" fontSize="normal" fontWeight="semiBold" color="dashboardPrimary">
              Email
            </H>
            <P fontSize="normal" fontWeight="regular" color="dashboardPrimary">
              {data.email}
            </P>
          </Field>
        )}
        <Field>
          <H level="3" fontSize="normal" fontWeight="semiBold" color="dashboardPrimary">
            Joined in
          </H>
          <P fontSize="normal" fontWeight="regular" color="dashboardPrimary">
            {data && moment(data.creationDate).format('YYYY-MM-DD')}
          </P>
        </Field>
      </CardBody>
    </CardStyled>
  );
};

export default UserCard;
