import React, { useContext } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import MainContent from "./MainContain";
import { StoreContext } from "../store/store";
import Login from "./Login";

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  width: 100vw;
  height: 100vh;
`;

export default function Layout() {
  const { isAuth } = useContext(StoreContext);

  return isAuth ? (
    <Container>
      <SideBar />
      <MainContent />
    </Container>
  ) : (
    <Login />
  );
}
