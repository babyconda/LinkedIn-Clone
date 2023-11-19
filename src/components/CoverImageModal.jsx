import { Button, Modal, Progress } from "antd";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import { BsUpload } from "react-icons/bs";
import { useFirebase } from "../context/Context";

const CoverImageModal = ({ open, setOpen, currentUser, setCurrentProfile }) => {
  const firebase = useFirebase();
  const [progress, setProgress] = useState(0);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePrev, setCoverImagePrev] = useState(null);

  const uploadCoverImageToDatabase = () => {
    firebase.uploadCoverImage(
      coverImage,
      currentUser.userID,
      setProgress,
      setOpen,
      setCoverImagePrev
    );
    firebase.getCurrentUser(setCurrentProfile);
  };
  return (
    <>
      <Button
        icon={
          <BsPencil
            style={{
              color: "#0a66c2",
              fontSize: "17px",
            }}
          />
        }
        onClick={() => setOpen(true)}
        style={{
          borderRadius: "50%",
          height: "38px",
          width: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Button>
      <Modal
        title="Add Cover Image"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[
          <Button key="1" type="primary" onClick={uploadCoverImageToDatabase}>
            Upload
          </Button>,
        ]}
      >
        <Container>
          <ProfileImage>
            {coverImagePrev === null ? (
              <img src="/images/card-bg.svg" alt="" />
            ) : (
              <img src={coverImagePrev} alt="" />
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
              setCoverImage(e.target.files[0]);
              setCoverImagePrev(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </Container>
      </Modal>
    </>
  );
};
export default CoverImageModal;

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
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;

  img {
    border-radius: 5px;
    width: 100%;
    height: 200px;
    @media (max-width: 768px) {
      height: 100px;
    }
  }
`;
