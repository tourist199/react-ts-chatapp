import { gql } from '@apollo/client';

export const messageSubscription = gql`
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

export const membershipSubscription = gql`
  subscription SidebarSubscription {
    Membership(where: { userId: { _eq: "user1" } }) {
      id
      direct
      Chanel {
        id
        name
      }
    }
  }
`;

export const allChannelsSubcription = gql`
  subscription AllChannelsSubcription($channelName: String) {
    Channel(
      where: {
        name: { _ilike: $channelName }
        Memberships: { direct: { _eq: false } }
      }
    ) {
      id
      name
      Memberships {
        userId
      }
    }
  }
`;
