import { State, Actions } from 'Types/User/UserDataState';
import { UserInfo } from 'Types/User/User';

export const stateInit = (userInfo: UserInfo | undefined): State => {
  return {
    displayName: userInfo ? userInfo.displayName : null,
    newPassword: '',
    oldPassword: '',
    repeatNewPassword: '',
    image: null,
    crop: { unit: '%', aspect: 1, x: 0, y: 0, width: 25, height: 25 },
  };
};

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'UserData/DisplayName':
      return {
        ...state,
        displayName: action.payload.length === 0 ? null : action.payload,
      };
    case 'UserData/OldPassword':
      return {
        ...state,
        oldPassword: action.payload,
      };
    case 'UserData/NewPassword':
      return {
        ...state,
        newPassword: action.payload,
      };
    case 'UserData/RepeatNewPassword':
      return {
        ...state,
        repeatNewPassword: action.payload,
      };
    case 'UserData/Image':
      return {
        ...state,
        image: action.payload,
      };
    case 'UserData/Crop':
      return {
        ...state,
        crop: {
          ...state.crop,
          ...action.payload,
        },
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ret: never = action;
      return state;
    }
  }
};
