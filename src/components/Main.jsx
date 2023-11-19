import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Context";
import ShareModal from "./ShareModal";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import getUniqueID from "../helpers/getUniqueID";
import ShareCard from "./ShareCard";
import SpinnerAntd from "./SpinnerAntd";
// import Following from "./Following";

export default function Main({ currentUser }) {
  const firebase = useFirebase();
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [allStatus, setAllStatus] = useState([]);
  const [imagePostLink, setImagePostLink] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // console.log("allStatus", allStatus.length);//

  const sendStatus = async () => {
    // let userEmail = localStorage.getItem("userEmail");
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userID,
      postImage: imagePostLink,
      videoLink: videoLink,
    };
    await firebase.postStatus(object);
    setOpen(false);
    setStatus("");
    setIsEdit(false);
    setVideoLink("");
  };

  const getEditData = (posts) => {
    setOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    firebase.updatePost(currentPost.id, status, setOpen, imagePostLink);
  };

  useMemo(() => {
    firebase.getStatus(setAllStatus);
  }, []);

  return (
    <Container>
      <ShareBox>
        <div>
          {currentUser?.imageLink ? (
            <img src={currentUser?.imageLink} alt="" />
          ) : (
            <img src="/images/placeholder.jpg" alt="" />
          )}
          <ShareModal
            status={status}
            setStatus={setStatus}
            sendStatus={sendStatus}
            open={open}
            setOpen={setOpen}
            currentUser={currentUser}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            updateStatus={updateStatus}
            imagePostLink={imagePostLink}
            setImagePostLink={setImagePostLink}
            currentPost={currentPost}
            setVideoLink={setVideoLink}
            videoLink={videoLink}
          />
        </div>
        <div>
          <button>
            <img src="/images/newphoto1024.png" alt="" />
            <span>Photo</span>
          </button>

          <button>
            <img src="/images/newvideo4096.png" alt="" />
            <span>Video</span>
          </button>

          <button>
            <img src="/images/newevent4096.png" alt="" />
            <span>Event</span>
          </button>

          <button>
            <img src="/images/newarticle4096.png" alt="" />
            <span>Write&nbsp;article</span>
          </button>
        </div>
      </ShareBox>

      <Content>
        {allStatus.length !== 0 ? (
          allStatus.map((posts, key) => (
            <Artical key={key}>
              <ShareCard
                posts={posts}
                currentUser={currentUser}
                open={open}
                setOpen={setOpen}
                getEditData={getEditData}
              />
            </Artical>
          ))
        ) : (
          <SpinnerAntd />
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  grid-area: main;
  height: 100vh;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 20px;
  background: white;
  border-radius: 5px;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 8px;
        object-fit: cover;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
        /* text-align: center; */
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-bottom: 4px;
      padding-right: 10px;

      button {
        img {
          margin: 0 6px 0 10px;
          width: 25px;
        }
        span {
          color: #70b5f9;
        }
      }
      @media (max-width: 768px) {
        /* display: flex; */
        flex-wrap: nowrap;
      }
    }
  }
`;

const Artical = styled(CommonCard)`
  padding: 0;
  margin: 0 0 20px;
  overflow: visible;
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
