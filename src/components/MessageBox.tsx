import React, { useEffect, useState, useContext } from "react";
import { isToday, isYesterday } from "date-fns";
import styled from "styled-components";
import { gql, useSubscription } from "@apollo/client";
import { StoreContext } from "../store/store";
import { messageSubscription } from "../data/subscriptions";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { groupBy } from "lodash";

const Container = styled.div`
  margin-top: 65px;
  overflow-y: auto;
  height: calc(100vh - 85px - 80px);
  position: relative;

  li {
    margin: 0.5rem;
    display: flex;
    padding: 10px 0;

    .avt-box {
      padding-right: 20px;

      img {
        height: 50px;
        width: 50px;
        border-radius: 100%;
      }
    }
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

const DateHeader = styled.div`
  display: block;
  height: 25px;
  position: relative;

  .line {
    border-bottom: 1px solid grey;
    position: absolute;
    top: 8px;
    height: 5px;
    z-index: 1;
    width: 100%;
  }

  .content {
    position: relative;
    border-radius: 15px;
    height: 25px;
    text-align: center;
    width: 200px;
    margin: 0 auto;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    border: 1px solid grey;
    font-weight: 600;
  }
`;
interface Message {
  id: string;
  body: string;
  date: string;
  User: {
    username: string;
    picture: string;
  };
}

export function MessageBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedChannel } = useContext(StoreContext);

  const { data: dataMsg, loading } = useSubscription(messageSubscription, {
    variables: { channelId: selectedChannel.id },
  });

  useEffect(() => {
    if (dataMsg) {
      const { Message } = dataMsg;
      setMessages(Message as Message[]);
    }
  });

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };

  let df = new Intl.DateTimeFormat(
    navigator.languages ? navigator.languages[0] : "en-US",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );
  let dates: any;

  if (messages) {
    const dtf = new Intl.DateTimeFormat(
      navigator.languages ? navigator.languages[0] : "en-US"
    );
    dates = groupBy(messages, (message: any) =>
      dtf.format(new Date(message.date))
    );
  }
  const rtf = new (Intl as any).RelativeTimeFormat(
    navigator.languages ? navigator.languages[0] : "en-US",
    { numeric: "auto" }
  );

  return (
    <Container>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader type="Circles" color="#a29bfe" height={80} width={80} />
        </div>
      ) : null}
      <ul>
        {Object.keys(dates).map((key, index) => {
          return (
            <div key={index}>
              <DateHeader>
                <div className="line"></div>
                <div className="content">
                  {isToday(new Date(dates[key][0].date))
                    ? rtf.format(0, "day")
                    : isYesterday(new Date(dates[key][0].date))
                    ? rtf.format(-1, "day")
                    : key}
                </div>
              </DateHeader>
              {dates[key].map((msg: any, index: number) => {
                return (
                  <li key={index}>
                    <div className="avt-box">
                      <img src={msg.User.picture} alt={msg.User.username} />
                    </div>
                    <div>
                      <Username>{msg.User.username}</Username>
                      <DateSpan>
                        {new Intl.DateTimeFormat("en-AU", options).format(
                          new Date(msg.date)
                        )}
                      </DateSpan>
                      <p>{msg.body}</p>
                    </div>
                  </li>
                );
              })}
            </div>
          );
        })}
      </ul>
    </Container>
  );
}
