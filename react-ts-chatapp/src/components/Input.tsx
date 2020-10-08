import * as React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { StoreContext } from '../store/store';

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid darkgrey;
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid dimgray;
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
`;

const SubmitButton = styled.button`
  border-radius: 7px;
  outline: none;
  background-color: white;
  border: none;
  border-left: 3px solid darkgrey;
  position: fixed;
  box-sizing: border-box;
  padding: 1.125rem;
  right: 27px;
  bottom: 15px;
  cursor: pointer;
`;

const submitMessageMutation = gql`
  mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!) {
    insert_Message(
      objects: { userId: $userId, body: $body, channelId: $channelId }
    ) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`;

export function InputMessage() {
  const [submitMessage, { data }] = useMutation(submitMessageMutation);
  const { selectedChannel } = React.useContext(StoreContext);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    console.log((e.target as any).message.value);

    submitMessage({
      variables: {
        userId: 'user1',
        channelId: selectedChannel.id,
        body: (e.target as any).message.value,
      },
    });
    (e.target as any).reset();
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <InputStyle name="message" type="text" placeholder="Message John Doe" />
      <SubmitButton type="submit">
        <i className="fas fa-arrow-alt-circle-right" />
      </SubmitButton>
    </form>
  );
}
