import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 85px - 60px);
  li {
    margin: 0.5rem;
  }

  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgray;
`;

export function MessageBox() {
  const messages = [
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
    {
      message:
        'Quod labore laboriosam dignissimos eum ullam minima rerum ea vel.',
      user: 'Angelo_Hackett68',
      date: 'Sun Mar 14 2021 14:03:10 GMT+0700 (Indochina Time)',
    },
  ];
  return (
    <Container>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <Username>{msg.user}</Username>
            <DateSpan>
              {new Intl.DateTimeFormat('en-GB').format(new Date(msg.date))}
            </DateSpan>
            <p>{msg.message}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
