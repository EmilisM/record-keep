import { ActionWithPayload } from 'Types/State';

export type Actions =
  | ActionWithPayload<'UserData/DisplayName', string>
  | ActionWithPayload<'UserData/OldPassword', string>
  | ActionWithPayload<'UserData/NewPassword', string>
  | ActionWithPayload<'UserData/RepeatNewPassword', string>
  | ActionWithPayload<'UserData/ImageUrl', string>;

export type State = {
  displayName: string | null;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  imageUrl: string | null;
};
