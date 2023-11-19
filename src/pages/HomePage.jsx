import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import Main from "../components/Main";
import RightSide from "../components/RightSide";
import { useFirebase } from "../context/Context";

export default function HomePage() {
  const { currentUserData } = useFirebase();

  return (
    <Container>
      <Header currentUser={currentUserData} />
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <p>
          &nbsp;Find talented pros in record time with Upwork and keep business
          moving.
        </p>
      </Section>

      <Layout>
        <div>
          <LeftSide currentUser={currentUserData} />
        </div>
        <Main currentUser={currentUserData} />
        <RightSide currentUser={currentUserData} />
      </Layout>
    </Container>
  );
}
// max-width: 100%;
const Container = styled.div`
  max-width: 100%;
  background-color: #e6e6e6;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 10px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  margin-bottom: -8px;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
    margin-top: 10px;
    margin-bottom: 8px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 5px 20px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
