import * as React from 'react';
import styled from 'styled-components';
import { Status } from './SideBar';
import { Channel, Membership } from './Channels';
import { Actions, StoreContext } from '../store/store';
import { JoinDmComponent } from './Sidebar/DMs/JoinDm.component';

const MessagesTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }
`;

export const Item = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
`;

const MembersCount = styled.span`
  padding: 3px;
  background-color: ${(props) => props.theme.backgroundColorGrey};
  color: ${(props) => props.theme.textColorDark};
  margin-right: calc(0.4rem - 1px);
  border-radius: 80%;
`;

interface DirectMessageProps {
  channels: Channel[];
}

export function DirectMessages({ channels }: DirectMessageProps) {
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
      <ul>
        {channels.map((channel) => (
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
            {/* {!channel.Memberships || channel.Memberships.length === 2 ? (
              <Status />
            ) : (
              <MembersCount>{channel.Memberships.length - 1}</MembersCount>
            )} */}
            <MembersCount>
              {channel.Memberships && channel.Memberships.length
                ? channel.Memberships.length
                : 0}
            </MembersCount>
            {DMTitles(channel)}
          </Item>
        ))}
      </ul>
    </>
  );
}
