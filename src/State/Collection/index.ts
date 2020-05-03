import { State, Actions } from 'Types/CollectionState';

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'editModal/set': {
      return {
        ...state,
        editModal: action.payload,
      };
    }
    case 'editModal/open': {
      return {
        ...state,
        editModal: true,
      };
    }
    case 'editModal/close': {
      return {
        ...state,
        editModal: false,
      };
    }
    case 'newRecordModal/set': {
      return {
        ...state,
        newRecordModal: action.payload,
      };
    }
    case 'newRecordModal/open': {
      return {
        ...state,
        newRecordModal: true,
      };
    }
    case 'newRecordModal/close': {
      return {
        ...state,
        newRecordModal: false,
      };
    }
    case 'deletionModal/open': {
      return {
        ...state,
        deletionModal: true,
      };
    }
    case 'deletionModal/close': {
      return {
        ...state,
        deletionModal: false,
      };
    }
    case 'activeRecord/set': {
      return {
        ...state,
        activeRecord: action.payload,
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const never: never = action;
      return state;
    }
  }
};

export const initialState: State = {
  editModal: false,
  newRecordModal: false,
  deletionModal: false,
  activeRecord: null,
};
