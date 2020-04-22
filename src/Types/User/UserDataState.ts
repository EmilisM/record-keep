import { ActionWithPayload } from 'Types/State';
import { Crop } from 'react-image-crop';

export type Actions =
  | ActionWithPayload<'UserData/DisplayName', string>
  | ActionWithPayload<'UserData/OldPassword', string>
  | ActionWithPayload<'UserData/NewPassword', string>
  | ActionWithPayload<'UserData/RepeatNewPassword', string>
  | ActionWithPayload<'UserData/Image', string | null>
  | ActionWithPayload<'UserData/Crop', Crop>;

export type State = {
  displayName: string | null;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  image: string | null;
  crop: Crop;
};
