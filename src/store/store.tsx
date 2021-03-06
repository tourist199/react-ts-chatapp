import React from "react";

export enum Actions {
  "SELECTED_CHANNEL",
  "USER",
  "USER_DATA",
  "UPDATE_IS_AUTH",
  "CHANNELS",
}

export interface UserData {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

interface SelectedChannel {
  id: string;
  name: string;
  members: number;
  memberships: any[];
}

interface State {
  selectedChannel: SelectedChannel;
  user: string;
  userData: UserData | null;
  isAuth: boolean;
  channels: any[];
}

interface Context extends State {
  dispatch: (action: Action, payload?: any) => void;
}

const initialChannel = localStorage.getItem("selected_channel")
  ? JSON.parse(localStorage.getItem("selected_channel")!)
  : {
      id: "5019addd-6146-42ee-aef3-3d80e0d7010b",
      name: "general",
      members: 7,
    };

const initialUserData =
  localStorage.getItem("userData") &&
  localStorage.getItem("userData") != "undefined"
    ? JSON.parse(localStorage.getItem("userData")!)
    : null;

const initialStoreValue = {
  selectedChannel: initialChannel,
  user: localStorage.getItem("current_user") || "",
  userData: initialUserData,
  isAuth:
    localStorage.getItem("isAuthenticated") &&
    localStorage.getItem("isAuthenticated") === "true"
      ? true
      : false,
  channels: [],
};

export const StoreContext = React.createContext<Context>({
  ...initialStoreValue,
  dispatch: () => "test",
});

type SelectedChannelAction = {
  type: Actions.SELECTED_CHANNEL;
  payload: SelectedChannel;
};

type UserAction = { type: Actions.USER; payload: string };

type UserDataAction = { type: Actions.USER_DATA; payload: UserData | null };

type IsAuthAction = { type: Actions.UPDATE_IS_AUTH; payload: boolean };

type ChannelsAction = { type: Actions.CHANNELS; payload: any[] };

type Action =
  | SelectedChannelAction
  | UserAction
  | UserDataAction
  | IsAuthAction
  | ChannelsAction;

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case Actions.SELECTED_CHANNEL:
      return { ...state, selectedChannel: action.payload };
    case Actions.USER:
      return { ...state, user: action.payload };
    case Actions.USER_DATA:
      return { ...state, userData: action.payload };
    case Actions.UPDATE_IS_AUTH:
      return { ...state, isAuth: action.payload };
    case Actions.CHANNELS:
      return { ...state, channels: action.payload };
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
      "selected_channel",
      JSON.stringify(store.selectedChannel)
    );
  }, [store.selectedChannel]);

  React.useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(store.userData));
  }, [store.userData]);

  React.useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(store.isAuth));
    if (!store.isAuth) localStorage.removeItem("isAuthenticated");
  }, [store.isAuth]);

  return (
    <StoreContext.Provider value={{ ...store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
}
