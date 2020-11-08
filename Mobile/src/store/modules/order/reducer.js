import producer from 'immer';

const INITIAL_STATE = {
  order: null,
  loading: false,
};

export default function order(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@order/EDIT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/EDIT_SUCCESS': {
        draft.order = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@order/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.order = null;
        break;
      }
      default:
    }
  });
}
