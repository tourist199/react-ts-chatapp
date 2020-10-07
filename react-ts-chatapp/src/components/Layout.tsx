import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import MainContent from './MainContain';

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  width: 100vw;
  height: 100vh;
`;

export default function Layout() {
  return (
    <Container>
      <SideBar></SideBar>
      <MainContent />
    </Container>
  );
}
