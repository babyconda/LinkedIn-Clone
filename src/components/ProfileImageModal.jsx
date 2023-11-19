import React, { useState } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { Progress } from "antd";
import { BsUpload } from "react-icons/bs";
import { useFirebase } from "../context/Context";

export default function ProfileImageModal({
  modalOpen,
  setModalOpen,
  currentUser,
  setCurrentProfile,
}) {
  const firebase = useFirebase();
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const uploadImageToDatabase = () => {
    firebase.uploadImage(
      currentImage,
      currentUser.userID,
      setProgress,
      setModalOpen,
      setImagePreview
    );
    firebase.getCurrentUser(setCurrentProfile);
  };

  const handleSubmit = () => {
    uploadImageToDatabase();
  };

  return (
    <>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="1" type="primary" onClick={handleSubmit}>
            Upload
          </Button>,
        ]}
      >
        <Container>
          <ProfileImage>
            {imagePreview === null ? (
              <img src="/images/placeholder.jpg" alt="" />
            ) : (
              <img src={imagePreview} alt="" />
            )}
          </ProfileImage>
          <div
            style={{
              width: 170,
              marginBottom: 5,
              marginLeft: 20,
            }}
          >
            {progress === 0 ? (
              <></>
            ) : (
              <Progress percent={progress} size="small" />
            )}
          </div>
          <label htmlFor="profileImage">
            <div className="uploadBtn">
              <BsUpload />
              <h1>Click to Upload</h1>
            </div>
          </label>
          <input
            id="profileImage"
            type="file"
            onChange={(e) => {
              setCurrentImage(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </Container>
      </Modal>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .uploadBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    row-gap: 10px;
    border: 1px solid #c9c9c9;
    color: #919492;
    padding: 3px 15px;
    cursor: pointer;
    h1 {
      font-size: 16px;
      margin-left: 6px;
    }
    &:hover {
      color: #0a66c2;
      border: 1px solid #0a66c2;
    }
  }
  input {
    display: none;
  }
`;

const ProfileImage = styled.div`
  /* width: 170px; */
  /* height: 170px; */
  border-radius: 50%;
  border: 5px solid #a7a8a7;
  margin-bottom: 10px;

  img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: fill;
  }
`;
