import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { gql, useSubscription } from '@apollo/client';
import { StoreContext } from '../store/store';
import { messageSubscription } from '../data/subscriptions';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Container = styled.div`
  margin-top: 65px;
  overflow-y: auto;
  height: calc(100vh - 85px - 80px);
  position: relative;

  li {
    margin: 0.5rem;
    display: flex;
    padding: 10px 0;

    .avt-box {
      padding-right: 20px;

      img {
        height: 50px;
        border-radius: 100%;
      }
    }
  }

  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgray;
`;

interface Message {
  id: string;
  body: string;
  date: string;
  User: {
    username: string;
    picture: string;
  };
}

export function MessageBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedChannel } = useContext(StoreContext);

  const { data: dataMsg, loading } = useSubscription(messageSubscription, {
    variables: { channelId: selectedChannel.id },
  });

  useEffect(() => {
    if (dataMsg) {
      const { Message } = dataMsg;
      setMessages(Message as Message[]);
    }
  });
  console.log(messages);

  return (
    <Container>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Loader
            type="Circles"
            color="#a29bfe"
            height={80}
            width={80}
            timeout={3000} //3 secs
          />
        </div>
      ) : null}
      <ul>
        {messages
          ? (messages as Message[]).map((msg, index) => (
              <li key={index}>
                <div className="avt-box">
                  <img src={msg.User.picture} alt={msg.User.username} />
                </div>
                <div>
                  <Username>{msg.User.username}</Username>
                  <DateSpan>
                    {/* {new Intl.DateTimeFormat('en-GB').format(new Date(msg.date))} */}
                    {msg.date}
                  </DateSpan>
                  <p>{msg.body}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
    </Container>
  );
}
