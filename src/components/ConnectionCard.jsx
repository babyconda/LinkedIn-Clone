import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Context";
import { TiUserAdd } from "react-icons/ti";

export default function ConnectedCard({ user, getCurrentUser, currentUser }) {
  const firebase = useFirebase();
  //   console.log("user", user);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    firebase.getConnections(currentUser.userID, user.id, setIsConnected);
  }, [currentUser.userID, user.id]);

  return isConnected ? (
    <></>
  ) : (
    <Box>
      <CoverImage>
        {user.coverImageLink ? (
          <img src={currentUser.coverImageLink} alt="" />
        ) : (
          <img src="/images/card-bg.svg" alt="" />
        )}
      </CoverImage>
      <ProfileImage>
        {user.imageLink ? (
          <img src={user.imageLink} />
        ) : (
          <img src="/images/placeholder.jpg" alt="" />
        )}
      </ProfileImage>

      <Information>
        <h1>{user.name}</h1>
        <h2>{user?.headline}</h2>
      </Information>
      <Button onClick={() => getCurrentUser(user.id)}>
        {" "}
        <TiUserAdd />
        Connect
      </Button>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const CoverImage = styled.div`
  img {
    width: 100%;
    height: 50px;
    border-radius: 5px 5px 0px 0px;
  }
`;
const ProfileImage = styled.div`
  img {
    width: 82px;
    height: 82px;
    border-radius: 50%;
    margin-top: -30px;
    object-fit: cover;
  }
`;

const Information = styled.div`
  /* margin-top: 5px; */
  text-align: center;
  h1 {
    font-size: 20px;
    font-weight: 500;
  }
  h2 {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    color: #7d807e;
  }
`;

const Button = styled.button`
  position: absolute;
  bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid #0a66c2;
  color: #0a66c2;
  padding: 2px 20px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 25px;
  &:hover {
    background-color: #d3e4f5;
  }
`;
