import { UserActivity } from 'Types/UserActivities';
import { ReactElement } from 'react';
import React from 'react';
import ListItem from 'Molecules/List/ListItem';
import { ReactComponent as CollectionIcon } from 'Assets/Collections.svg';
import { ReactComponent as RecordIcon } from 'Assets/Records.svg';
import { ReactComponent as User } from 'Assets/User.svg';
import { ReactComponent as Image } from 'Assets/Image.svg';
import moment from 'moment';
import { RouteConfig } from 'Routes/RouteConfig';

export const getActivityItemTime = (timestamp: Date): string => {
  return moment(timestamp).fromNow();
};

const getUserActivityItems = (activity: UserActivity, index: number): ReactElement | null => {
  const time = getActivityItemTime(activity.timestamp);

  switch (activity.action.name) {
    case 'CollectionCreate': {
      if (!activity.collection) {
        return null;
      }

      return (
        <ListItem
          to={`${RouteConfig.Dashboard.Collections.Root}/${activity.collection.id}`}
          image={activity.collection.image?.data}
          key={index}
          time={time}
          Icon={CollectionIcon}
        >
          Created collecion {activity.collection?.name}
        </ListItem>
      );
    }
    case 'CollectionDelete': {
      return (
        <ListItem key={index} time={time} Icon={CollectionIcon}>
          Deleted collection
        </ListItem>
      );
    }
    case 'CollectionUpdate': {
      if (!activity.collection) {
        return null;
      }

      return (
        <ListItem
          to={`${RouteConfig.Dashboard.Collections.Root}/${activity.collection.id}`}
          image={activity.collection.image?.data}
          key={index}
          time={time}
          Icon={CollectionIcon}
        >
          Updated collecion {activity.collection?.name}
        </ListItem>
      );
    }
    case 'CollectionDeleteWithMove': {
      if (!activity.collection) {
        return null;
      }

      return (
        <ListItem
          to={`${RouteConfig.Dashboard.Collections.Root}/${activity.collection.id}`}
          image={activity.collection.image?.data}
          key={index}
          time={time}
          Icon={CollectionIcon}
        >
          Deleted collecion and moved records to {activity.collection?.name}
        </ListItem>
      );
    }
    case 'ImageCreate': {
      return (
        <ListItem key={index} time={time} Icon={Image}>
          Changed image
        </ListItem>
      );
    }
    case 'ImageUpdate': {
      return (
        <ListItem key={index} time={time} Icon={Image}>
          Changed image
        </ListItem>
      );
    }
    case 'PasswordChange': {
      return (
        <ListItem key={index} time={time} Icon={User}>
          Changed password
        </ListItem>
      );
    }
    case 'UserUpdate': {
      return (
        <ListItem key={index} time={time} Icon={User}>
          Updated user info
        </ListItem>
      );
    }
    case 'RecordCreate': {
      if (!activity.record) {
        return null;
      }

      return (
        <ListItem
          to={`${RouteConfig.Dashboard.Records.Root}/${activity.record.id}`}
          image={activity.record.image?.data}
          key={index}
          time={time}
          Icon={RecordIcon}
        >
          Created record {activity.record.name} by {activity.record.artist}
        </ListItem>
      );
    }
    case 'RecordDelete': {
      return (
        <ListItem key={index} time={time} Icon={RecordIcon}>
          Deleted record
        </ListItem>
      );
    }
    case 'RecordUpdate': {
      if (!activity.record) {
        return null;
      }

      return (
        <ListItem
          to={`${RouteConfig.Dashboard.Records.Root}/${activity.record.id}`}
          image={activity.record.image?.data}
          key={index}
          time={time}
          Icon={RecordIcon}
        >
          Updated record {activity.record.name} by {activity.record.artist}
        </ListItem>
      );
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const never: never = activity.action.name;
      return null;
    }
  }
};

export default getUserActivityItems;
