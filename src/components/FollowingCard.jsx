import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Context";
import { TiUserAdd } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

export default function FollowingCard({
  user,
  getCurrentUser,
  currentUser,
  unFollowUser,
}) {
  const firebase = useFirebase();
  const location = useLocation();

  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    firebase.getConnections(currentUser?.userID, user?.id, setIsConnected);
  }, [currentUser?.userID, user.id]);

  if (location.pathname === "/profile") {
    return isConnected ? (
      <>
        <Box>
          <ProfileImage>
            {user?.imageLink ? (
              <img src={user?.imageLink} />
            ) : (
              <img src="/images/placeholder.jpg" alt="" />
            )}
          </ProfileImage>

          <Information>
            <h1>{user?.name}</h1>
            {/* <h2>{user?.headline}</h2> */}
          </Information>
          <ButtonFollowing onClick={() => unFollowUser(user?.id)}>
            {" "}
            <BsCheckLg />
            Following
          </ButtonFollowing>
        </Box>
      </>
    ) : (
      <></>
    );
  }
  return isConnected ? (
    <></>
  ) : (
    <Box>
      <ProfileImage>
        {user.imageLink ? (
          <img src={user.imageLink} />
        ) : (
          <img src="/images/placeholder.jpg" alt="" />
        )}
      </ProfileImage>

      <Information>
        <h1>{user.name}</h1>
      </Information>
      <Button onClick={() => getCurrentUser(user.id)}>
        {" "}
        <TiUserAdd />
        Connect
      </Button>
    </Box>
  );
}

const ButtonFollowing = styled.button`
  position: absolute;
  right: 5px; 

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #9c9c9c;
  padding: 2px 8px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 25px;
  &:hover {
    background-color: #bfbfbf;
    color: white;
    border: none;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ProfileImage = styled.div`
  display: flex;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 5px 10px 5px 10px;
    object-fit: cover;
  }
`;

const Information = styled.div`
  width: 170px;
  overflow-x: hidden;
  h1 {
    text-align: left;
    font-size: 18px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  /* h2 {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    color: #7d807e;
  } */
`;

const Button = styled.button`
  position: absolute;
  right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid #0a66c2;
  color: #0a66c2;
  padding: 2px 20px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 25px;
  &:hover {
    background-color: #d3e4f5;
  }
`;
