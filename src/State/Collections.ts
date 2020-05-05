import { State, Actions } from 'Types/CollectionsState';

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
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
    case 'isCreating/set': {
      return {
        ...state,
        isCreating: action.payload,
      };
    }
    case 'newCollectionName/set': {
      return {
        ...state,
        newCollectionName: action.payload,
      };
    }
    case 'searchQuery/set': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case 'activeCollection/set': {
      return {
        ...state,
        activeCollection: action.payload,
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
  activeCollection: null,
  deletionModal: false,
  editModal: false,
  isCreating: false,
  newCollectionName: '',
  searchQuery: '',
};
