import React, { useContext } from 'react';
import styled from 'styled-components';
import Channels, { Channel } from './Channels';
import { DirectMessages } from './DirectMessage';
import { gql, useSubscription } from '@apollo/client';
import { StoreContext, Actions, UserData } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';

const membershipSubcription = gql`
  subscription membershipSubcription($userId: String!) {
    Channel(where: { Memberships: { userId: { _eq: $userId } } }) {
      id
      name
      Memberships {
        userId
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
  background: rebeccapurple;
  padding: 1rem;
  color: white;
  box-sizing: border-box;
  overflow-y: auto;
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
  const { userData, isAuth, dispatch } = useContext(StoreContext);
  const {
    loginWithRedirect,
    user: userAuth0,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const updateUserData = (userData: UserData) => {
    dispatch({ type: Actions.USER_DATA, payload: userData });
  };

  const updateIsAuth = (_isAuth: boolean) => {
    dispatch({ type: Actions.UPDATE_IS_AUTH, payload: _isAuth });
  };

  const { loading, error, data } = useSubscription(membershipSubcription, {
    variables: { userId: userData && userData.sub ? userData.sub : 'user1' },
  });

  console.log(userAuth0);

  React.useEffect(() => {
    console.log(isAuthenticated, userData);
    if (isAuthenticated && userAuth0) {
      updateIsAuth(true);
      updateUserData(userAuth0);
    }
  }, [isAuthenticated, userData]);

  console.log(localStorage.getItem('isAuthenticated') !== 'false');

  console.log(isAuth);

  return isAuth ? (
    <SideBarContainer>
      <div>
        <img src={userData!.picture} alt={userData!.name} height={100} />
        <h2>{userData!.name}</h2>
        <p>{userData!.email}</p>
      </div>
      <Header>
        <H1>Chat</H1>
        <div>
          <i className="far fa-bell" />
        </div>
        <UsernameContainer>
          <Status></Status> {userData!.name}
        </UsernameContainer>
      </Header>
      {!loading && data && data.Channel ? (
        <>
          <Channels
            channels={(data.Channel as Channel[]).filter(
              (chanel) => !chanel.Memberships[0].direct
            )}
          />
          <DirectMessages
            channels={(data.Channel as Channel[]).reduce((acc, value) => {
              if (value.Memberships[0].direct) {
                return [...acc, value];
              }

              return acc;
            }, [] as Channel[])}
          />
        </>
      ) : null}
    </SideBarContainer>
  ) : (
    <SideBarContainer>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <div>Loading ...</div>
    </SideBarContainer>
  );
}
