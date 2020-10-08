import React from 'react';
import styled from 'styled-components';
import { Item } from './DirectMessage';
import { StoreContext, Actions } from '../store/store';

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: white;
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export interface Channel {
  id: string;
  name: string;
}

interface ChanelProps {
  channels: Channel[];
}

export default function Channels({ channels }: ChanelProps) {
  const { dispatch } = React.useContext(StoreContext);
  const [isModalOpen, setModal] = React.useState(false);

  const selectChannel = (channel: { id: string; name: string }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      <ChannelsTitles>
        <h2>Channel</h2>
        <i className="fas fa-plus" />
      </ChannelsTitles>
      <ul>
        {channels.map((channel) => (
          <Item
            onClick={() =>
              selectChannel({ id: channel.id, name: channel.name })
            }
            key={channel.id}
          >
            # {channel.name}
          </Item>
        ))}
      </ul>
      <Button className="channel-button">
        <i className="fas fa-plus" />
        Add channel
      </Button>
    </>
  );
}
