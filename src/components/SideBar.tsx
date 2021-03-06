import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Channels, { Channel } from "./Channels";
import { DirectMessages } from "./DirectMessage";
import { gql, useSubscription } from "@apollo/client";
import { StoreContext, Actions, UserData } from "../store/store";
import { useAuth0 } from "@auth0/auth0-react";

const membershipSubcription = gql`
  subscription membershipSubcription($userId: String!) {
    Channel(where: { Memberships: { userId: { _eq: $userId } } }) {
      id
      name
      Memberships {
        User {
          id
          name
          picture
        }
        direct
        id
      }
      Memberships_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const SideBarContainer = styled.div`
  height: 100%;
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
  padding: 1rem;
  color: white;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const BtnLogout = styled.button`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 25px;
  color: white;
  font-size: 1.2rem;
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size: 1.3rem;
`;

const SideContent = styled.div`
  height: calc(100vh - 220px);
`;

const UsernameContainer = styled.div`
  font-size: 1rem;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 1rem;
`;

export const Status = styled.span`
  height: 0.7rem;
  width: 0.7rem;
  border-radius: 100%;
  background-color: green;
  margin-right: 0.3rem;
  display: inline-block;
`;

interface Membership {
  direct: boolean;
  id: string;
  Channel: Channel;
}

export default function SideBar() {
  // const [channels, setChannels] = useState<Channel[]>([]);
  const { userData, channels, dispatch } = useContext(StoreContext);
  const { logout } = useAuth0();

  const updateUserData = (userData: UserData) => {
    dispatch({ type: Actions.USER_DATA, payload: userData });
  };

  const updateIsAuth = (_isAuth: boolean) => {
    dispatch({ type: Actions.UPDATE_IS_AUTH, payload: _isAuth });
  };

  const updateDataChannels = (_channels: any[]) => {
    dispatch({ type: Actions.CHANNELS, payload: _channels });
  };

  const { loading, error, data } = useSubscription(membershipSubcription, {
    variables: { userId: userData && userData.sub ? userData.sub : "user1" },
  });

  useEffect(() => {
    updateDataChannels(data ? data.Channel : []);
  }, [data]);

  const logOutApp = () => {
    localStorage.clear();

    logout({ returnTo: window.location.origin });
    updateIsAuth(false);
  };

  return (
    <SideBarContainer>
      {userData ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={userData!.picture}
              alt={userData!.name}
              height={60}
              width={60}
              style={{ borderRadius: "100%" }}
            />
          </div>

          <h2>{userData!.name}</h2>
          <p>{userData!.email}</p>
        </div>
      ) : null}
      <SideContent>
        <Header>
          <H1>Chat</H1>
          <div>
            <i className="far fa-bell" />
          </div>
          <UsernameContainer>
            <Status></Status> {userData?.name}
          </UsernameContainer>
        </Header>
        <div>
          <Channels
            channels={
              channels
                ? (channels as any[]).filter(
                    (chanel) => !chanel.Memberships[0].direct
                  )
                : []
            }
            loading={loading}
          />
          <DirectMessages
            loading={loading}
            channels={
              channels
                ? (channels as any[]).reduce((acc, value) => {
                    if (value.Memberships[0].direct) {
                      return [...acc, value];
                    }

                    return acc;
                  }, [] as Channel[])
                : []
            }
          />
        </div>
      </SideContent>
      <BtnLogout onClick={() => logOutApp()}>
        <i style={{ marginRight: "20px" }} className="fas fa-sign-out" />
        <b> Logout</b>
      </BtnLogout>
    </SideBarContainer>
  );
}
