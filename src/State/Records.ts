import { State, Actions } from 'Types/RecordsState';

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'searchQuery/set': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case 'deleteModal/open': {
      return {
        ...state,
        deleteModal: true,
      };
    }
    case 'deleteModal/close': {
      return {
        ...state,
        deleteModal: false,
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
  searchQuery: '',
  deleteModal: false,
  editModal: false,
  activeRecord: null,
};
