import * as React from 'react';
import { Modal } from '../../Modal/Modal.component';
import { Form } from '../../../styles/ModalButtons';
import { allChannelsQuery } from '../../../data/queries';
import styled from 'styled-components';
import { Input } from '../../../styles/Input.styles';
import { debounce } from 'lodash';
import { StoreContext, Actions } from '../../../store/store';
import { joinChannel } from '../../../data/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { Channel } from '../../../components/Channels';

interface Props {
  exitCallback: () => void;
}

const ChannelItem = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid ${(props) => props.theme.borderColorLight};
  box-sizing: border-box;
  cursor: pointer;
`;

const ChannelContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  ${ChannelItem}:last-child {
    border-bottom: 1px solid ${(props) => props.theme.borderColorLight};
  }
`;

const SearchInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

export function JoinChannel(props: Props) {
  const { userData, dispatch } = React.useContext(StoreContext);
  const refectchRef = React.useRef<Function>();
  const createMembershipRef = React.useRef();
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    (refectchRef as any).current({ channelName: `%${e.target.value}%` });
  }, 300);

  const [createMembershipFn, { data: dataJoinChannel }] = useMutation(
    joinChannel
  );

  const { loading, error, data: dataAllChannels, refetch } = useQuery(
    allChannelsQuery,
    {
      variables: { channelName: '%%' },
    }
  );

  React.useEffect(() => {
    (createMembershipRef as any).current = createMembershipFn;
  }, [createMembershipFn]);

  React.useEffect(() => {
    refectchRef.current = refetch;
  }, [refetch]);

  React.useEffect(() => {
    console.log(dataAllChannels);
  });

  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };

  function selectChannel(
    channel: { id: string; name: string; members: number },
    memberships: { userId: string }[]
  ) {
    if (memberships.some((membership) => membership.userId === userData!.sub)) {
      dispatch({ type: Actions.SELECTED_CHANNEL, payload: channel });
    } else {
      (createMembershipRef as any)

        .current({
          variables: { channelId: channel.id, userId: userData!.sub },
        })
        .then((resp: any) => {
          const channelAffiliation =
            resp.data.insert_Membership.returning[0].Channel;
          dispatch({
            type: Actions.SELECTED_CHANNEL,
            payload: channelAffiliation,
          });
        });
    }
    props.exitCallback();
  }
  return (
    <Modal close={props.exitCallback} title="Browse channels">
      <>
        <Form>
          <SearchInput
            name="channelName"
            id="channelName"
            placeholder="Search channels"
            onChange={filterChannels}
          />
        </Form>

        <ChannelContainer>
          {() => {
            return null;
          }}
          {dataAllChannels &&
            dataAllChannels.Channel.map((channel: Channel) => {
              return (
                <ChannelItem
                  key={channel.id}
                  onClick={() =>
                    selectChannel(
                      {
                        id: channel.id,
                        name: channel.name,
                        members: channel.Memberships_aggregate.aggregate.count,
                      },
                      channel.Memberships
                    )
                  }
                >
                  # {channel.name}
                </ChannelItem>
              );
            })}
        </ChannelContainer>
      </>
    </Modal>
  );
}
