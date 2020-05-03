import { Style } from './StyleEntity';

export interface RecordStyleRequest {
  recordId?: string;
  styleId?: string;
}

export interface RecordStyle {
  recordId: number;
  styleId: number;
  style: Style;
}
