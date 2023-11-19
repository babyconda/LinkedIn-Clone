import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import EditProfile from "./EditProfile";
import ProfileImageModal from "./ProfileImageModal";
import CoverImageModal from "./CoverImageModal";
import { useFirebase } from "../context/Context";
import ShareCard from "./ShareCard";
// import Following from "./Following";
import ShareModal from "./ShareModal";
import { useLocation } from "react-router-dom";
import LeftSide from "./LeftSide";

export default function MyProfile({ currentUser }) {
  const firebase = useFirebase();
  let location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(currentUser);
  const [allStatus, setAllStatus] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [status, setStatus] = useState("");
  // console.log("MY Profile", location.state);

  const getEditData = (posts) => {
    setOpen1(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  // console.log(currentProfile);

  useMemo(() => {
    firebase.getStatus(setAllStatus);
  }, []);

  useMemo(() => {
    if (location?.state?.id) {
      firebase.getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      firebase.getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, [location?.state]);

  return (
    <>
      <MainContainer>
        <Container>
          <Section>
            <CoverImage>
              {currentProfile.coverImageLink ? (
                <img src={currentProfile.coverImageLink} alt="" />
              ) : (
                <img src="/images/card-bg.svg" alt="" />
              )}

              {currentProfile.email === currentUser.email ? (
                <div className="coverEditIcon">
                  <CoverImageModal
                    setOpen={setOpen}
                    open={open}
                    currentUser={currentProfile}
                    setCurrentProfile={setCurrentProfile}
                  />
                </div>
              ) : (
                <></>
              )}
            </CoverImage>
            <ProfileImage>
              <div className="profileDiv" onClick={() => setModalOpen(true)}>
                {currentProfile.imageLink ? (
                  <img src={currentProfile.imageLink} alt="" />
                ) : (
                  <img src="/images/placeholder.jpg" alt="" />
                )}
              </div>
              {location.state ? (
                <></>
              ) : (
                <ProfileImageModal
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  currentUser={currentProfile}
                  setCurrentProfile11111111111111={setCurrentProfile}
                />
              )}
            </ProfileImage>
            {currentProfile.email === currentUser.email ? (
              <div className="editInfo">
                <EditProfile
                  currentUser={currentProfile}
                  setCurrentProfile={setCurrentProfile}
                  // setAllStatus={setAllStatus}
                  // allStatus={allStatus}
                />
              </div>
            ) : (
              <></>
            )}
          </Section>
          <Information>
            <SectionA>
              <h1>{currentProfile.name}</h1>
              <h2>{currentProfile.headline}</h2>
              <h3>{currentProfile.subheadline}</h3>
              <h3>{currentProfile.company}</h3>
              <h3>{currentProfile.industry}</h3>
              <span>
                {currentProfile.city}
                {currentProfile.city ? ", " : ""}
              </span>
              <span>{currentProfile.country}</span>

              <h5>{currentProfile.website}</h5>
            </SectionA>
            <SectionB>
              <h5>{currentProfile.college}</h5>
              <h5>{currentProfile.email}</h5>
            </SectionB>
          </Information>
        </Container>
        {currentProfile.aboutMe ? (
          <About>
            <AboutInfo>
              <h1>About</h1>
              <h2>{currentProfile.aboutMe}</h2>
            </AboutInfo>
          </About>
        ) : (
          <></>
        )}

        <ProfileStatus>
          <div className="leftSideContainer">
            <LeftSide currentUser={currentUser} />
          </div>

          <StatusPost>
            {allStatus
              .filter((item) => {
                return item.userEmail === currentProfile.email;
              })
              .map((posts) => {
                return (
                  <Artical key={posts.id}>
                    <ShareCard
                      posts={posts}
                      currentUser={currentUser}
                      open={open1}
                      setOpen={setOpen1}
                      getEditData={getEditData}
                    />
                  </Artical>
                );
              })}
          </StatusPost>
        </ProfileStatus>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Container = styled.div`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding-bottom: 15px;
  @media (max-width: 768px) {
    /* margin-left: -20px; */
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
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  /* @media (max-width: 768px) {
    width: 143%;
  } */
`;

const Section = styled.div`
  width: 100%;
  position: relative;

  .editInfo {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47px;
    height: 39px;
    right: 20px;
    margin-top: 20px;
    color: #0a66c2;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #d3e4f5;
    }
  }
`;

const CoverImage = styled.div`
  width: 100%;
  img {
    width: 100%;
    max-height: 250px;
    border-radius: 5px 5px 0px 0px;
  }
  input {
    display: none;
  }
  .coverEditIcon {
    position: absolute;

    right: 25px;
    top: 25px;
  }
`;

const ProfileImage = styled.div`
  position: absolute;
  margin-top: -120px;
  margin-left: 50px;
  border-radius: 50%;
  border: 5px solid white;
  &:hover {
    border: 5px solid #0a66c2;
  }
  .profileDiv {
  }

  img {
    border-radius: 50%;
    width: 170px;
    height: 170px;
    cursor: pointer;
    object-fit: cover;
  }

  input {
    display: none;
  }
  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    margin-top: -40px;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      cursor: pointer;
      object-fit: cover;
      margin-top: -4px;
    }
  }
`;

const Information = styled.div`
  margin-top: 80px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const SectionA = styled.div`
  width: 60%;
  height: auto;

  h1 {
    font-size: 30px;
    font-weight: 700;
    font-family: system-ui;
    text-transform: capitalize;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
    font-family: system-ui;
  }
  h3,
  span {
    font-size: 18px;
    font-weight: 400;
    font-family: system-ui;
    color: #757474;
  }
  h5 {
    font-size: 16px;
    font-weight: 500;
    font-family: system-ui;
    color: #0a66c2;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 20px;
      font-weight: 700;
      font-family: system-ui;
      text-transform: capitalize;
    }
    h2 {
      font-size: 14px;
      font-weight: 500;
      font-family: system-ui;
    }
    h3,
    span {
      font-size: 12px;
      font-weight: 400;
      font-family: system-ui;
      color: #757474;
    }
    h5 {
      font-size: 12px;
      font-weight: 500;
      font-family: system-ui;
      color: #0a66c2;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
const SectionB = styled.div`
  width: 40%;
  height: auto;
  padding-left: 100px;
  margin-top: -100px;
  text-align: left;

  h5 {
    font-size: 16px;
    font-weight: 500;
    font-family: system-ui;
  }
  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
    margin-top: -100px;
    h5 {
      font-size: 14px;
      font-weight: 400;
      font-family: system-ui;
    }
  }
`;

const About = styled.div`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0/ 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding-bottom: 15px;
  margin-bottom: -20px;

  @media (max-width: 768px) {
    /* margin-left: -20px; */
  }
`;

const AboutInfo = styled.div`
  margin-left: 50px;
  margin-right: 30px;
  margin-top: 20px;
  h1 {
    font-size: 22px;
    font-weight: 500;
    font-family: system-ui;
    padding-top: 10px;
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    font-family: system-ui;
    padding-top: 10px;
    padding-bottom: 15px;
  }
  @media (max-width: 768px) {
    margin-left: 20px;
    h1 {
      font-size: 18px;
      font-weight: 500;
      font-family: system-ui;
    }
    h2 {
      font-size: 14px;
      font-weight: 400;
      font-family: system-ui;
    }
  }
`;

const ProfileStatus = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 40px;
  row-gap: 10px;
  column-gap: 40px;
  .leftSideContainer {
    width: 35%;
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const StatusPost = styled.div`
  width: 60%;
  & > img {
    width: 30px;
  }
  @media (max-width: 768px) {
    /* margin-left: -20px; */
    width: 100%;
  }
`;

const Artical = styled(CommonCard)`
  padding: 0;
  margin: 0 0 20px;
  overflow: visible;
`;
