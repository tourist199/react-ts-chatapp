import * as React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { StoreContext } from '../store/store';

const SubmitButton = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-left: ${(props) => `3px solid ${props.theme.borderColorDark}`};
  position: fixed;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1rem;
  right: 27px;
  bottom: 13px;
  cursor: pointer;
`;

const InputStyle = styled.input`
  padding: 1rem;
  border-radius: 7px;
  border: 3px solid ${(props) => props.theme.borderColorDark};
  font-size: 1rem;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid ${(props) => props.theme.hoverBorderColor};
    & + ${SubmitButton} {
      border-left: 3px solid ${(props) => props.theme.hoverBorderColor};
    }
  }
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 220px);
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
  const { selectedChannel, userData } = React.useContext(StoreContext);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();

    submitMessage({
      variables: {
        userId: userData!.sub,
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
