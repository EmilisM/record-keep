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
    case 'editRecordModal/close': {
      return {
        ...state,
        editRecordModal: false,
      };
    }
    case 'editRecordModal/open': {
      return {
        ...state,
        editRecordModal: true,
      };
    }
    case 'collectionDeleteModal/open': {
      return {
        ...state,
        collectionDeleteModal: true,
      };
    }
    case 'collectionDeleteModal/close': {
      return {
        ...state,
        collectionDeleteModal: false,
      };
    }
    case 'selectedRecords/clear': {
      return {
        ...state,
        selectedRecords: {},
      };
    }
    case 'selectedRecords/add': {
      return {
        ...state,
        selectedRecords: {
          ...state.selectedRecords,
          [action.payload]: true,
        },
      };
    }
    case 'selectedRecords/remove': {
      const newSelectedRecords = {
        ...state.selectedRecords,
      };

      delete newSelectedRecords[action.payload];

      return {
        ...state,
        selectedRecords: newSelectedRecords,
      };
    }
    case 'deleteAllModal/open': {
      return {
        ...state,
        deleteAllModal: true,
      };
    }
    case 'deleteAllModal/close': {
      return {
        ...state,
        deleteAllModal: false,
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
  editRecordModal: false,
  collectionDeleteModal: false,
  selectedRecords: {},
  deleteAllModal: false,
};
