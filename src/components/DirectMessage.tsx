import * as React from "react";
import styled from "styled-components";
import { Status } from "./SideBar";
import { Channel, Membership } from "./Channels";
import { Actions, StoreContext } from "../store/store";
import { JoinDmComponent } from "./Sidebar/DMs/JoinDm.component";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MessagesTitles = styled.div`
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

export const Item = styled.li`
  margin: 0.25rem 0;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    transform: scale(1.005);
    background: rgba(255, 255, 255, 0.2);
  }
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

export const ListItem = styled.ul`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-y: auto;
  max-height: calc((100vh - 430px) / 2);
  min-height: calc((100vh - 600px) / 2);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &:hover:-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px black;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0, 1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

interface DirectMessageProps {
  channels: Channel[];
  loading: boolean;
}

export function DirectMessages({ channels, loading }: DirectMessageProps) {
  const { dispatch, selectedChannel } = React.useContext(StoreContext);
  const [isJoinDM, setDMModal] = React.useState<boolean>(false);

  const selectChannel = (channel: {
    id: string;
    name: string;
    members: number;
    memberships: any[];
  }) => {
    dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
  };

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
          <div style={{ textAlign: "center" }}>
            <Loader type="ThreeDots" color="#4b6584" height={50} width={50} />
          </div>
        ) : (
          channels.map((channel) => (
            <Item
              onClick={() =>
                selectChannel({
                  id: channel.id,
                  name: channel.name,
                  members: channel.Memberships_aggregate.aggregate.count,
                  memberships: channel.Memberships,
                })
              }
              className={channel.id == selectedChannel.id ? "active" : ""}
              key={channel.id}
            >
              {channel.Memberships &&
              channel.Memberships.length &&
              channel.Memberships.length !== 2 ? (
                <FlexBox>
                  <MembersCount>{channel.Memberships.length}</MembersCount>
                  {channel.name}
                </FlexBox>
              ) : (
                <>
                  <Status />
                  {channel.name}
                </>
              )}
            </Item>
          ))
        )}
      </ListItem>
    </>
  );
}
