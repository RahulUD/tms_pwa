export const TOAST = (state, payload) => (
  (state.toast.code = payload.code), (state.toast.title = payload.title), (state.toast.message = payload.message)
);
export const LOADING = (state, payload) => (state.loading = payload);
