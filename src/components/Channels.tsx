import React from "react";
import styled from "styled-components";
import { Item, ListItem } from "./DirectMessage";
import { StoreContext, Actions } from "../store/store";
import { Finder } from "./Sidebar/Channels/CreateChannel.component";
import { JoinChannel } from "./Sidebar/Channels/JoinChannel.component";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-weight: bold;

  h2 {
    font-size: 1rem;
  }

  i {
    cursor: pointer;
  }
`;

const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: ${(props) => props.theme.textColorLight};
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export interface Membership {
  direct: boolean;
  id: string;
  userId: string;
}

interface Memberships_aggregate {
  aggregate: {
    count: number;
  };
}
export interface Channel {
  id: string;
  name: string;
  Memberships: Membership[];
  Memberships_aggregate: Memberships_aggregate;
}

interface ChanelProps {
  channels: Channel[];
  loading: boolean;
}

export default function Channels({ channels, loading }: ChanelProps) {
  const { dispatch, selectedChannel } = React.useContext(StoreContext);
  const [isModalOpen, setModal] = React.useState(false);
  const [isJoinChannelOpen, setJoinChannelModal] = React.useState<boolean>(
    false
  );

  const selectChannel = (channel: {
    id: string;
    name: string;
    members: number;
  }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

  return (
    <>
      {isModalOpen ? <Finder exitCallback={() => setModal(false)} /> : null}
      {isJoinChannelOpen ? (
        <JoinChannel exitCallback={() => setJoinChannelModal(false)} />
      ) : null}
      <ChannelsTitles>
        <h2>Channel</h2>
        <i className="fas fa-plus" onClick={() => setModal(true)} />
      </ChannelsTitles>
      <ListItem>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Loader type="ThreeDots" color="#4b6584" height={50} width={50} />
          </div>
        ) : (
          <>
            {channels!.map((channel) => (
              <Item
                className={channel.id == selectedChannel.id ? "active" : ""}
                onClick={() =>
                  selectChannel({
                    id: channel.id,
                    name: channel.name,
                    members: channel.Memberships_aggregate.aggregate.count || 0,
                  })
                }
                key={channel.id}
              >
                # {channel.name}
              </Item>
            ))}
          </>
        )}
      </ListItem>

      <Button
        className="channel-button"
        onClick={() => setJoinChannelModal(true)}
      >
        <i className="fas fa-plus" />
        Join channel
      </Button>
    </>
  );
}
