import * as React from 'react';
import styled from 'styled-components';
import { Status } from './SideBar';
import { Channel, Membership } from './Channels';
import { Actions, StoreContext } from '../store/store';
import { JoinDmComponent } from './Sidebar/DMs/JoinDm.component';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }

  i {
    cursor: pointer;
  }
`;

export const Item = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
`;

const MembersCount = styled.div`
  background-color: ${(props) => props.theme.backgroundColorGrey};
  color: ${(props) => props.theme.textColorDark};
  margin-right: calc(0.4rem - 1px);
  border-radius: 100%;
  height: 20px;
  width: 20px;
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.ul`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FlexBox = styled.div`
  display: flex;
`;

interface DirectMessageProps {
  channels: Channel[];
  loading: boolean;
}

export function DirectMessages({ channels, loading }: DirectMessageProps) {
  const { dispatch, user } = React.useContext(StoreContext);
  const [isJoinDM, setDMModal] = React.useState<boolean>(false);

  const selectChannel = (channel: {
    id: string;
    name: string;
    members: number;
  }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  function DMTitles(channel: Channel) {
    return channel.Memberships.reduce((acc, value: Membership) => {
      if (value.userId !== user) {
        return [...acc, value.userId];
      }
      return acc;
    }, [] as string[]).join(' - ');
  }
  console.log(channels);

  return (
    <>
      {isJoinDM ? (
        <JoinDmComponent exitCallback={() => setDMModal(false)} />
      ) : null}
      <MessagesTitles>
        <h2>Messages</h2>
        <i className="fas fa-plus" onClick={() => setDMModal(true)} />
      </MessagesTitles>
      <ListItem>
        {loading ? (
          <Loader type="ThreeDots" color="#4b6584" height={50} width={50} />
        ) : (
          channels.map((channel) => (
            <Item
              onClick={() =>
                selectChannel({
                  id: channel.id,
                  name: channel.name,
                  members: channel.Memberships_aggregate.aggregate.count,
                })
              }
              key={channel.id}
            >
              {channel.Memberships &&
              channel.Memberships.length &&
              channel.Memberships.length !== 2 ? (
                <FlexBox>
                  <MembersCount>{channel.Memberships.length}</MembersCount>
                  {DMTitles(channel)}
                </FlexBox>
              ) : (
                <>
                  <Status />
                  {DMTitles(channel)}
                </>
              )}
            </Item>
          ))
        )}
      </ListItem>
    </>
  );
}
