import React, { useContext } from "react";
import { StoreContext } from "../store/store";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { CreateChannelMutation, CreateMembership } from "../data/mutations";

interface Props {
  exitCallback: () => void;
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;

export function Finder(props: Props) {
  const { user } = useContext(StoreContext);

  const [createMembership, { data: dataMembership }] = useMutation(
    CreateMembership
  );

  const [createChannel, { data: dataChannel }] = useMutation(
    CreateChannelMutation,
    {
      onCompleted(data: any) {
        createMembership({
          variables: {
            channelId: data.insert_Channel!.returning[0].id,
            userId: user,
          },
        });
        props.exitCallback();
      },
    }
  );

  return (
    <Container>
      <ExitButtonContainer>
        <ButtonClose onClick={props.exitCallback}>
          <i className="far fa-times-circle" />
          esc
        </ButtonClose>
      </ExitButtonContainer>
      <h1>Create channel</h1>
      <Form
        onSubmit={(e: any) => {
          e.preventDefault();
          createChannel({
            variables: { name: e.target.channelName.value },
          });
          e.target.reset();
        }}
      >
        <label htmlFor="channelName">Name</label>
        <input
          name="channelName"
          id="channelName"
          placeholder="eg leads"
          autoComplete="off"
        />
        <button onClick={props.exitCallback}>Cancel</button>
        <button type="submit">Create</button>
      </Form>
    </Container>
  );
}
