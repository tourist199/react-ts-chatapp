import React from 'react'
import styled from 'styled-components'
import SideBar from './SideBar'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 100vh;
`

export default function Layout() {
    return (
        <Container>
            <SideBar></SideBar>
            <div>test</div>
        </Container>
    )
}
