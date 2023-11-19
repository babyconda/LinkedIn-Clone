import React, { useEffect, useMemo } from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { useFirebase } from "../context/Context";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
export default function EditProfile({
  currentUser,
  setCurrentProfile,
  setAllStatus,
  allStatus,
}) {
  const firebase = useFirebase();
  const [open, setOpen] = useState(false);
  const [editInputs, setEditInputs] = useState(currentUser);

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  };

  const updateProfileData = () => {
    firebase.editProfile(currentUser?.userID, editInputs);
    setOpen(false);
    firebase.getSingleUser(setCurrentProfile, editInputs?.email);
  };

  return (
    <>
      <HiOutlinePencil onClick={() => setOpen(true)} fontSize="35px" />

      <Modal
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        height={1000}
        footer={[
          <Button
            style={{ marginBottom: "50px" }}
            key="1"
            type="primary"
            block
            onClick={updateProfileData}
          >
            Submit
          </Button>,
        ]}
      >
        <h1
          style={{ fontSize: "25px", fontFamily: "system-ui", fontWeight: 500 }}
        >
          Edit Info
        </h1>
        <div
          style={{ borderBottom: "1px solid #9e9e9e", padding: "5px" }}
        ></div>
        <Container>
          <Details>
            <label htmlFor="name">Name</label>
            <input
              onChange={getInput}
              id="name"
              placeholder="Enter Your name"
              name="name"
              value={editInputs.name}
            />

            <label htmlFor="headline">Headline</label>
            <input
              onChange={getInput}
              id="headline"
              className="edit-input"
              placeholder="Headline"
              name="headline"
              value={editInputs.headline}
            />

            <label htmlFor="subheadline">SubHeadline</label>
            <input
              onChange={getInput}
              id="subheadline"
              className="edit-input"
              placeholder="Hash Tags"
              name="subheadline"
              value={editInputs.subheadline}
            />
            <label htmlFor="country">Country</label>
            <input
              onChange={getInput}
              id="country"
              className="edit-input"
              placeholder="Country"
              name="country"
              value={editInputs.country}
            />
            <label htmlFor="city">City</label>
            <input
              onChange={getInput}
              id="city"
              className="edit-input"
              placeholder="City"
              name="city"
              value={editInputs.city}
            />
            <label htmlFor="company">Company</label>
            <input
              onChange={getInput}
              id="company"
              className="edit-input"
              placeholder="Company"
              name="company"
              value={editInputs.company}
            />
            <label htmlFor="industry">Industry</label>
            <input
              onChange={getInput}
              id="industry"
              className="edit-input"
              placeholder="Industry"
              name="industry"
              value={editInputs.industry}
            />
            <label htmlFor="college">College</label>
            <input
              onChange={getInput}
              id="college"
              className="edit-input"
              placeholder="College"
              name="college"
              value={editInputs.college}
            />
            <label htmlFor="website">Website</label>
            <input
              onChange={getInput}
              id="website"
              className="edit-input"
              placeholder="Website"
              name="website"
              value={editInputs.website}
            />

            <label htmlFor="skills">Skills</label>
            <input
              onChange={getInput}
              id="skills"
              className="edit-input"
              placeholder="Skills"
              name="skills"
              value={editInputs.skills}
            />

            <label htmlFor="about">About</label>
            <textarea
              onChange={getInput}
              id="about"
              className="edit-textarea"
              rows={2}
              placeholder="About Me"
              name="aboutMe"
              value={editInputs.aboutMe}
            />
          </Details>
        </Container>
      </Modal>
    </>
  );
}

const Container = styled.div`
  grid-area: main;
  border-radius: 5px;
  margin-top: -40px;
  z-index: 10000;
  
`;

const Details = styled.div`
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 15px 15px 15px;

  label {
    padding: 5px;
    font-family: system-ui;
    color: #666666;
  }
  input {
    border: 1px solid #cfcfcf;
    padding: 5px;
    margin-bottom: 10px;
    font-family: system-ui;
    color: black;
    border-radius: 5px;
    &:focus {
      border: 2px solid #0a66c2;
      outline: none;
    }
  }
  textarea {
    border: 1px solid #cfcfcf;
    padding: 5px;
    margin-bottom: 10px;
    font-family: system-ui;
    color: black;
    &:focus {
      border: 2px solid #0a66c2;
      outline: none;
    }
  }
`;
