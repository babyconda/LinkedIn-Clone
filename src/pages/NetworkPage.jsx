import React, { useMemo, useState } from "react";
import { useFirebase } from "../context/Context";
import styled from "styled-components";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import ConnectedCard from "../components/ConnectionCard";

export default function NetworkPage() {
  const firebase = useFirebase();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getCurrentUser = (id) => {
    firebase.addConnection(currentUser.userID, id);
  };

  useMemo(() => {
    firebase.getCurrentUser(setCurrentUser);
    firebase.getAllUsers(setUsers);
  }, []);

  // const isLoading = firebase.isLoading;
  // const currentUser = firebase.currentUserData;
  return (
    <MainContainer>
      <Header currentUser={currentUser} />

      <Layout>
        <LeftSide currentUser={currentUser} />
        <Container>
          <Section>
            <h1>People you may know</h1>
          </Section>
          <Content>
            {users.map((user, key) => {
              return user.id === currentUser.userID ? (
                <div key={currentUser.userID}></div>
              ) : (
                <Artical key={user.id}>
                  <ConnectedCard
                    user={user}
                    getCurrentUser={getCurrentUser}
                    key={user.id}
                    currentUser={currentUser}
                  />
                </Artical>
              );
            })}
          </Content>
        </Container>
      </Layout>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  max-width: 100%;
  background-color: #e6e6e6;
  height: 100vh;
  /* @media (max-width: 768px) {
    
    margin-bottom: 100px;
  } */
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main";
  grid-template-columns: minmax(0, 3fr) minmax(0, 12fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const Container = styled.div`
  grid-area: main;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding-bottom: 15px;
  @media (max-width: 768px) {
    /* margin-left: -20px; */
    margin-bottom: 60px;
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
  /* box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%); */
`;

const Artical = styled(CommonCard)`
  padding: 0;
  /* margin: 0 0 20px; */
  margin: 10px 0px 10px 10px;
  overflow: visible;
`;

const Content = styled.div`
  text-align: center;

  display: flex;
  & > img {
    width: 30px;
  }
`;

const Section = styled.div`
  /* margin: 10px; */
  h1 {
    padding: 10px;
    font-size: 20px;
    font-family: system-ui;
    font-weight: 500;
  }
`;
