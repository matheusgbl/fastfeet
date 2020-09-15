export function editOrderRequest(id) {
  return {
    type: '@order/EDIT_REQUEST',
    payload: { id },
  };
}

export function editOrderSuccess(data) {
  return {
    type: '@order/EDIT_SUCCESS',
    payload: { data },
  };
}

export function editOrderFailure() {
  return {
    type: '@order/EIDT_FAILURE',
  };
}

export function updateOrderRequest(id, data) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { id, data },
  };
}
export function updateOrderSuccess() {
  return {
    type: '@order/UPDATE_SUCCESS',
  };
}
export function updateOrderFailure() {
  return {
    type: '@order/UPDATE_FALIURE',
  };
}
