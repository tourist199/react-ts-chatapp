import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { gql, useSubscription } from '@apollo/client';
import { StoreContext } from '../store/store';

const Container = styled.div`
  margin-top: 65px;
  overflow-y: auto;
  height: calc(100vh - 85px - 80px);
  li {
    margin: 0.5rem;
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

const messageSubscription = gql`
  subscription MessageSubscription($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;

interface Message {
  id: string;
  body: string;
  date: string;
  User: {
    username: string;
  };
}

export function MessageBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedChannel } = useContext(StoreContext);

  const { data: dataMsg, loading } = useSubscription(messageSubscription, {
    variables: { channelId: selectedChannel.id },
  });
  console.log(dataMsg);

  useEffect(() => {
    if (dataMsg) {
      const { Message } = dataMsg;
      setMessages(Message as Message[]);
    }
  });

  return (
    <Container>
      <ul>
        {messages
          ? (messages as Message[]).map((msg, index) => (
              <li key={index}>
                <Username>{msg.User.username}</Username>
                <DateSpan>
                  {/* {new Intl.DateTimeFormat('en-GB').format(new Date(msg.date))} */}
                  {msg.date}
                </DateSpan>
                <p>{msg.body}</p>
              </li>
            ))
          : null}
      </ul>
    </Container>
  );
}
