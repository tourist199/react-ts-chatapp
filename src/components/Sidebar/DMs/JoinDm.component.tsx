import * as React from "react";
import styled from "styled-components";
import { Modal } from "../../Modal/Modal.component";
import { Input } from "../../../styles/Input.styles";
import { CloseButton, SubmitButton, Form } from "../../../styles/ModalButtons";
import { allUsersQuery, checkMembership } from "../../../data/queries";
import { StoreContext, Actions } from "../../../store/store";
import { DataItem } from "../../../styles/DataModal.styles";
import { debounce, random } from "lodash";
import { useQuery, ApolloClient, useMutation } from "@apollo/client";
import { createDMChannel } from "../../../data/mutations";

interface User {
  username: string;
  id: string;
  color: string;
}

const colors = [
  "RebeccaPurple",
  "Teal",
  "MediumPurple",
  "Navy",
  "MediumSeaGreen",
];

const UserTag = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  margin-top: 0.3rem;
  color: white;
  border-radius: 0.5rem;
  position: relative;
`;

const DataContainer = styled.div`
  margin-top: 2rem;
  max-height: calc(100vh - 470px);
  overflow-y: auto;
  ${DataItem}:last-child {
    border-bottom: 1px solid ${(props) => props.theme.borderColorLight};
  }
`;

const UserDeleteTag = styled.span.attrs({
  role: "button",
})`
  color: white;
  font-size: 1.2rem;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 9;
  cursor: pointer;
`;

interface Props {
  exitCallback: () => void;
  client?: ApolloClient<any>;
}

export function JoinDmComponent(props: Props) {
  const { userData, dispatch } = React.useContext(StoreContext);
  const [selectedUsers, setSelectedUser] = React.useState<User[]>([]);

  const { loading, error, data: dataUsers, refetch } = useQuery(allUsersQuery, {
    variables: { currentUserId: userData!.sub, filter: "%" },
  });

  const [createDMChannelFn, { data: dataDMChannel }] = useMutation(
    createDMChannel([userData!.sub, ...selectedUsers.map((user) => user.id)]),
    {
      variables: {
        title: `${userData!.name}-${selectedUsers
          .map((user) => user!.username)
          .join("-")}`,
      },
      onCompleted() {
        props.exitCallback();
      },
    }
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    fetchData(e);
  };
  const fetchData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    refetch({
      currentUserId: userData!.sub,
      filter: `%${e.target.value}%`,
    });
  }, 300);

  function setMembership() {
    createDMChannelFn();
  }

  return (
    <Modal close={props.exitCallback} title="Direct Messages">
      <>
        <Form
          onSubmit={(e: any) => {
            e.preventDefault();
            setMembership();
            e.target.reset();
          }}
        >
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="eg leads"
            onChange={onChangeInputValue}
            autoComplete="off"
          />
          <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
          <SubmitButton type="submit">Join DM</SubmitButton>
        </Form>
        {selectedUsers.map((user) => (
          <UserTag style={{ backgroundColor: user.color }} key={user.id}>
            {user.username}
            <UserDeleteTag
              onClick={() =>
                setSelectedUser((prevState: User[]) =>
                  prevState.filter((us) => us.id !== user.id)
                )
              }
            >
              X
            </UserDeleteTag>
          </UserTag>
        ))}
        {loading ? (
          <p>loading</p>
        ) : (
          <DataContainer>
            {dataUsers.User.map((user: { id: string; username: string }) => (
              <DataItem
                key={user.id}
                onClick={() =>
                  setSelectedUser((prevState: User[]) => {
                    if (prevState.find((us) => us.id === user.id)) {
                      return prevState;
                    }
                    return [
                      ...prevState,
                      { ...user, color: colors[random(0, 4)] },
                    ];
                  })
                }
              >
                @ {user.username}
              </DataItem>
            ))}
          </DataContainer>
        )}
      </>
    </Modal>
  );
}
