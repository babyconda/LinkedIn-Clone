import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useFirebase } from "../context/Context";

export default function LeftSide({ currentUser }) {
  const firebase = useFirebase();
  const location = useLocation();
  // console.log("LeftLocation", location);

  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    setCurrentProfile(currentUser);
  }, [currentUser]);

  useMemo(() => {
    if (location?.state?.email) {
      firebase.getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, [location?.state?.email, currentProfile]);

  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CarBackground>
            {currentProfile?.coverImageLink ? (
              <img src={currentProfile?.coverImageLink} alt="" />
            ) : (
              <img src="/images/card-bg.svg" alt="" />
            )}
          </CarBackground>

          <Photo>
            {currentProfile?.imageLink ? (
              <img src={currentProfile?.imageLink} alt="" />
            ) : (
              <img src="/images/placeholder.jpg" alt="" />
            )}
          </Photo>
          <Link>
            Welcome, {currentProfile?.name ? currentProfile?.name : "Back"}
          </Link>

          <a>
            <AddPhotoText>{currentProfile?.headline}</AddPhotoText>
          </a>
        </UserInfo>
        <Widget>
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </Widget>
        <Item>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </Item>
      </ArtCard>
      <CommunityCard>
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>
            Events
            <img src="/images/plus-icon.svg" alt="" />
          </span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </CommunityCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: leftside;
  position: sticky;
  top: 85px;

  @media (max-width: 768px) {
    position: relative;
  }
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
`;

const CarBackground = styled.div`
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
  img {
    max-height: 70px;
    width: 100%;
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
      /* height: 100%; */
      max-height: 70px;
    }
  }
`;

const Photo = styled.div`
  box-shadow: none;
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -25px auto 12px;
  border-radius: 50%;
  /* background-color: red; */
  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    margin-left: -2px;
    margin-top: -2px;
    object-fit: cover;
  }
`;

const Link = styled.div`
  text-transform: capitalize;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;

const Widget = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left;

      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #0a66c2;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;
