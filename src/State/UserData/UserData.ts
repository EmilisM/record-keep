import { State, Actions } from 'Types/UserDataState';
import { UserInfo } from 'Types/User';

export const stateInit = (userInfo: UserInfo | undefined): State => {
  return {
    displayName: userInfo ? userInfo.displayName : null,
    newPassword: '',
    oldPassword: '',
    repeatNewPassword: '',
    imageUrl: userInfo && userInfo.image?.url ? userInfo.image.url : null,
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
    case 'UserData/ImageUrl':
      return {
        ...state,
        imageUrl: action.payload,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ret: never = action;
      return state;
    }
  }
};
