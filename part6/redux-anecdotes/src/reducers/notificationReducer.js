const notificationsAtStart = ['Success!', 'Fail!'];

const asObject = (notification) => {
  return {
    notification,
  };
};

const initialState = notificationsAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log('state :>> ', state);
  console.log('action :>> ', action);

  switch (action.type) {
    case 'NOTIFY':
      return state.notification;
    default:
      return state;
  }
};

export default reducer;
