import React, { useState } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { BsImage } from "react-icons/bs";
import { RxVideo } from "react-icons/rx";
import { useFirebase } from "../context/Context";
import { Progress, Space, Tooltip } from "antd";

export default function ShareModal({
  status,
  setStatus,
  open,
  setOpen,
  sendStatus,
  isEdit,
  setIsEdit,
  updateStatus,
  currentUser,
  imagePostLink,
  setImagePostLink,
  currentPost,
  setVideoLink,
  videoLink,
}) {
  const firebase = useFirebase();
  const [progress, setProgress] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const showModal = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleOk = (e) => {
    setOpen(false);
    setStatus("");
    setImagePostLink("");
    setVideoLink("");
  };
  const handleCancel = (e) => {
    setOpen(false);
    setStatus("");
    setImagePostLink("");
    setVideoLink("");
  };

  return (
    <>
      <Button onClick={showModal}>Start Post...</Button>
      <Modal
        title="Create Post"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            disabled={
              status.length > 0 || imagePostLink !== "" || videoLink !== ""
                ? false
                : true
            }
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <>
          <UserData>
            {currentUser?.imageLink ? (
              <img src={currentUser?.imageLink} alt="" />
            ) : (
              <img src={"./images/placeholder.jpg"} alt="" />
            )}
            <h1>{currentUser?.name}</h1>
          </UserData>
          <ShareContent>
            <textarea
              placeholder="What do you want you talk about?"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            />
            {showInput ? (
              <input
                className="videoInput"
                type="text"
                onChange={(e) => setVideoLink(e.target.value)}
                placeholder="Please input a Video link"
              />
            ) : (
              <></>
            )}
            {progress === 0 || progress === 100 ? (
              <></>
            ) : (
              <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                  percent={progress}
                  success={{
                    percent: 30,
                  }}
                  type="circle"
                />
              </Tooltip>
            )}
            {imagePostLink?.length > 0 || currentPost?.postImage?.length > 0 ? (
              <img src={imagePostLink || currentPost?.postImage} />
            ) : (
              <></>
            )}
          </ShareContent>
          <ActionButton>
            <label htmlFor="profileImage">
              <BsImage className="imageButton" />
            </label>
            <input
              className="imageInput"
              id="profileImage"
              type="file"
              onChange={(e) => {
                firebase.uploadPostImage(
                  e.target.files[0],
                  setImagePostLink,
                  setProgress
                );
              }}
            />

            <RxVideo
              className="videoButton"
              onClick={() => setShowInput(!showInput)}
            />
          </ActionButton>
        </>
      </Modal>
    </>
  );
}

const UserData = styled.div`
  border-top: 1px solid #e3dfde;
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
    object-fit: contain;
  }
  h1 {
    /* margin-top: 10px; */
    font-size: 20px;
    font-weight: 700;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: 100px; */
  textarea {
    margin-top: 10px;
    width: 100%;
    height: 100%;
    border-style: none;
    resize: none;
    outline: none;
    overflow: hidden;
    font-family: system-ui;
    font-size: 16px;
  }
  img {
    width: 100%;
    max-height: 250px;
  }
  .videoInput {
    border: 2px solid #999999;
    width: 100%;
    height: 40px;
    padding: 5px;
    font-family: system-ui;
    font-size: 18px;
    font-weight: 500;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: absolute;
  bottom: 15px;
  .imageButton {
    font-size: 30px;
    color: #999999;
    cursor: pointer;
    &:hover {
      background-color: #e6e8e6;
    }
  }
  .imageInput {
    display: none;
  }
  .videoButton {
    font-size: 35px;
    color: #999999;
    cursor: pointer;
    &:hover {
      background-color: #e6e8e6;
    }
  }
`;
