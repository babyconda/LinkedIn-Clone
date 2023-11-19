import { Skeleton } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useFirebase } from "../context/Context";
import SpinnerAntd from "../components/SpinnerAntd";

import Header from "../components/Header";
import RightSide from "../components/RightSide";
import MyProfile from "../components/MyProfile";

export default function ProfilePage() {
  const firebase = useFirebase();
  const { currentUserData, setCurrentUserData } = useFirebase();

  useEffect(() => {
    firebase.getCurrentUser(setCurrentUserData);
  }, [!currentUserData]);

  return (
    <>
      {currentUserData ? (
        <Container>
          <Header currentUser={currentUserData} />
          <Layout>
            <MyProfile currentUser={currentUserData} />
            <RightSide />
          </Layout>
        </Container>
      ) : (
        <>
          <SpinnerAntd />
        </>
      )}
    </>
  );
}

const Container = styled.div`
  max-width: 100%;
  margin-left: 10px;
  background-color: #e6e6e6;
  margin: 0;
`;

const Layout = styled.div`
  display: flex;
  margin: 20px 0;
  column-gap: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding: 0 5px;
  }
`;
