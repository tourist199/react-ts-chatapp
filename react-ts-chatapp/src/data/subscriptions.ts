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

// export const membershipSubcription = gql`
//   subscription SidebarSubcription($userId: String!) {
//     Membership(where: { userId: { _eq: $userId } }) {
//       id
//       direct
//       Channel {
//         id
//         name
//       }
//     }
//   }
// `;

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
export const membershipSubcription = gql`
  subscription SidebarSubcription($user: String) {
    Channel(where: { Memberships: { userId: { _eq: $user } } }) {
      id
      name
      Memberships {
        userId
        direct
        id
      }
      Memberships_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
