export interface RecordType {
  id: number;
  name: string;
}

export type RecordTypes = {
  [t: string]: number;
};

export interface RecordTypeProgression {
  name: string;
  recordTypes: RecordTypes;
}
