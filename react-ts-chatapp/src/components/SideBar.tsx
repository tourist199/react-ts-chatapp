import React, { useContext } from 'react';
import styled from 'styled-components';
import Channels, { Channel } from './Channels';
import { DirectMessages } from './DirectMessage';
import { gql, useSubscription } from '@apollo/client';
import { StoreContext } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';

const membershipSubcription = gql`
  subscription SidebarSubcription($userId: String!) {
    Membership(where: { userId: { _eq: $userId } }) {
      id
      direct
      Channel {
        id
        name
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
  const { user } = useContext(StoreContext);
  const {
    loginWithRedirect,
    user: userData,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const { loading, error, data } = useSubscription(membershipSubcription, {
    variables: { userId: user },
  });

  return isAuthenticated ? (
    <SideBarContainer>
      <div>
        <img src={userData.picture} alt={userData.name} />
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>
      <Header>
        <H1>Chat</H1>
        <div>
          <i className="far fa-bell" />
        </div>
        <UsernameContainer>
          <Status></Status> John Doe
        </UsernameContainer>
      </Header>
      <Channels
        channels={
          data
            ? (data.Membership as Membership[])
                .filter((membership) => !membership.direct)
                .map((membership) => membership.Channel)
            : []
        }
      />
      <DirectMessages
        channels={
          data
            ? (data.Membership as Membership[]).reduce((acc, value) => {
                if (value.direct) {
                  return [...acc, value.Channel];
                }

                return acc;
              }, [] as Channel[])
            : []
        }
      />
    </SideBarContainer>
  ) : (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <div>Loading ...</div>
    </div>
  );
}
