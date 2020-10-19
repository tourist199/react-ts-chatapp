import React, { useContext, useState } from "react";
import styled from "styled-components";
import { StoreContext } from "../store/store";

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  background-color: white;
  width: calc(100vw - 240px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColorLight};
`;

const Title = styled.div`
  h3 {
    font-weight: 900;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  i {
    margin-right: 0.5rem;
    color: darkgray;
  }
`;

const Input = styled.input`
  border: 1px solid darkgray;
  padding: 0.5rem;
  border-radius: 5px;
  outline: none;

  &::placeholder {
    font-size: 1rem;
  }

  &:hover,
  &:active,
  &:focus {
    border: 3px solid DimGray;
  }
`;

export default function MainContentHeader() {
  const { selectedChannel } = useContext(StoreContext);
  const [displayMember, setDisplayMember] = useState(true);
  const [displayInvitePeople, setDisplayInvitePeople] = useState(false);

  return (
    <Container>
      <Title>
        <div style={{ display: "flex" }}>
          <h3 style={{ marginRight: "30px" }}>#{selectedChannel.name}</h3>
          <div>
            <i className="far fa-plus" />
            Mời thêm người
          </div>
        </div>
        <div>
          <i
            className="far fa-user"
            onClick={() => setDisplayMember(!displayMember)}
          />
          {!displayMember ? (
            <>
              {selectedChannel ? selectedChannel.members : 0} member
              {selectedChannel && selectedChannel.members > 1 && "s"}
            </>
          ) : (
            <>
              {selectedChannel?.memberships.map((usr) => (
                <div
                  key={usr.id}
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  <span>
                    <img
                      height={20}
                      width={20}
                      style={{ borderRadius: "50%" }}
                      src={usr!.User!.picture}
                      alt="113213"
                    />
                  </span>{" "}
                  {usr!.User!.name}
                </div>
              ))}
            </>
          )}
        </div>
      </Title>
      <div>
        <Input type="text" autoComplete="off" placeholder="search" />
      </div>
    </Container>
  );
}
