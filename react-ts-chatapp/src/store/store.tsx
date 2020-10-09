import * as React from 'react';

export enum Actions {
  'SELECTED_CHANNEL',
  'USER',
}

const initialChannel = localStorage.getItem('selected_channel')
  ? JSON.parse(localStorage.getItem('selected_channel')!)
  : { id: '607c38e6-69ce-4468-9877-acd3021cb84a', name: 'user1-user2' };

const initialStoreValue = {
  selectedChannel: initialChannel,
  user: localStorage.getItem('current_user')
    ? JSON.parse(localStorage.getItem('current_user'))
    : '',
};

export const StoreContext = React.createContext<Context>({
  ...initialStoreValue,
  dispatch: () => 'test',
});

type SelectedChannelAction = {
  type: Actions.SELECTED_CHANNEL;
  payload: { id: string; name: string };
};
type UserAction = {
  type: Actions.USER;
  payload: { id: string; username: string };
};

type Action = SelectedChannelAction | UserAction;

interface State {
  selectedChannel: { id: string; name: string };
  user: { id: string; username: string };
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void;
}

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
      return { ...state, selectedChannel: action.payload };
    case Actions.USER:
      return { ...state, user: action.payload };
    default:
      throw new Error();
  }
}

interface Props {
  children: React.ReactNode;
}

export function StoreContextProvider(props: Props) {
  const [store, dispatch] = React.useReducer(storeReducer, initialStoreValue);
  React.useEffect(() => {
    localStorage.setItem(
      'selected_channel',
      JSON.stringify(store.selectedChannel)
    );
  }, [store.selectedChannel]);

  React.useEffect(() => {
    if (!store.user) {
      const value = prompt('Select a user');
      if (value) {
        dispatch({ type: Actions.USER, payload: value });
        localStorage.setItem('current_user', value);
      }
    }
  }, [store.user]);
  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
