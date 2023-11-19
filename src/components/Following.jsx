import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useFirebase } from "../context/Context";

import FollowingCard from "./FollowingCard";
import { useLocation } from "react-router-dom";

export default function Following() {
  const firebase = useFirebase();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // console.log(location.state);

  const getCurrentUser = (id) => {
    firebase.addConnection(currentUser?.userID, id);
  };

  const unFollowUser = (id) => {
    firebase.deleteConnection(currentUser?.userID, id);
  };

  useMemo(() => {
    firebase.getCurrentUser(setCurrentUser);
    firebase.getAllUsers(setUsers);
  }, []);

  return (
    <Container>
      <Section>
        {location.pathname === "/profile" ? (
          <h1>You are Following</h1>
        ) : (
          <h1>Want to follow</h1>
        )}
        <img src="/images/feed-icon.svg" alt="" />
      </Section>
      <Content>
        {users.map((user, key) => {
          return user?.id === currentUser?.userID ? (
            <div key={user.id}></div>
          ) : (
            <Artical key={key}>
              <FollowingCard
                user={user}
                getCurrentUser={getCurrentUser}
                key={user?.id}
                currentUser={currentUser}
                unFollowUser={unFollowUser}
              />
            </Artical>
          );
        })}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding-bottom: 15px;
  max-height: 500px;
  position: sticky;
  top: 85px;  
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
`;
const Artical = styled(CommonCard)`
  padding: 0;
  margin: 5px 10px;
  overflow: visible;
`;

const Content = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  & > img {
    width: 30px;
  }
`;

const Section = styled.div`
  /* margin: 10px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  z-index: 100000;
  position: sticky;
  top: 0;
  background: white;
  padding-right: 5px;

  h1 {
    padding: 10px;
    font-size: 20px;
    font-family: system-ui;
    font-weight: 500;
  }
`;
