import React, { useEffect, useState, useId, useContext } from "react";
import styled from "styled-components";
import linkedinLogo from "../assets/linkedinLogo.png";
import googleLogo from "../assets/googleLogo.png";
import { useFirebase } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { registerUserWithEmail, user, loginWithGoogle } = useFirebase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const loginUserWithGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      await registerUserWithEmail(name, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Nav>
        <a href="/">
          <img src={linkedinLogo} alt="" />
        </a>
      </Nav>

      <Section>
        <h1>Make the most of your professional life</h1>
        <Wrapper>
          <Field>
            <label htmlFor="name">Enter Your Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email or phone number</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password (6 or more characters)</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="policyText">
              By Clicking Agree & Join, you agree to the LinkedIn{" "}
              <span>User Agreement, Privacy Policy</span>, and{" "}
              <span>Cookie Policy.</span>
            </p>
            <button className="emailBtn" onClick={handleSignUp}>
              Agree & Join
            </button>
            <h5>
              <span>or</span>
            </h5>
            <button className="googleBtn" onClick={loginUserWithGoogle}>
              <div>
                <img src={googleLogo} alt="" />
                <span>Continue with Google</span>
              </div>
            </button>
            <p className="signInText">
              Already on LinkedIn?{" "}
              <span onClick={() => navigate("/signin")}> &nbsp;Sign in </span>
            </p>
          </Field>
        </Wrapper>
        <OutSide>
          <p>
            Looking to create a page for a business <span> Get help </span>
          </p>
        </OutSide>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0;
  overflow: hidden;
`;

const Nav = styled.nav`
  img {
    width: 140px;
    margin-left: 130px;
    padding-top: 20px;
    @media (max-width: 768px) {
      margin-top: 20px;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 32px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    font-family: system-ui;
    margin-bottom: 10px;
    margin-top: -10px;
    @media (max-width: 768px) {
      margin-top: 20px;
      text-align: center;
    }
  }
`;

const Wrapper = styled.div`
  margin-top: 10px;
  width: 360px;
  font-family: system-ui;
  padding: 0px 20px 0px 20px;
  border-radius: 8px;
  background-color: white;

  h1 {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 400;
    margin-top: -17px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  label {
    font-family: system-ui;
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.75);
    margin-bottom: 5px;
  }

  input {
    height: 30px;
    margin-bottom: 17px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    font-family: system-ui;
    font-size: 15px;
    padding: 5px;
    padding-left: 15px;
  }

  input:focus {
    border: 2px solid #0a66c2;
    color: rgba(0, 0, 0, 0.7);
    outline: none;
  }

  .policyText {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    padding: 10px;
    margin-top: -10px;
    margin-bottom: 8px;
    text-align: center;

    span {
      color: #0a66c2;
      font-weight: 600;
    }
  }

  .emailBtn {
    height: 50px;
    border-radius: 25px;
    background-color: #0a66c2;
    border: none;
    outline: none;
    color: white;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  h5 {
    width: 100%;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.8);
    line-height: 0.1em;
    margin: 10px 0 20px;
  }

  h5 span {
    background: #fff;
    padding: 0 10px;
  }

  .googleBtn {
    height: 45px;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: white;
    color: black;
    margin-top: 5px;
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      img {
        width: 20px;
      }

      span {
        color: rgba(0, 0, 0, 0.8);
        font-size: 14px;
        font-family: system-ui;
        font-weight: 600;
      }
    }
  }

  .signInText {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    font-family: system-ui;
    color: rgba(0, 0, 0, 0.9);
    margin-top: -30px;
    margin-bottom: 5px;
    span {
      color: #0a66c2;
      cursor: pointer;
    }
  }
`;

const OutSide = styled.div`
  margin-top: 5px;
  p {
    font-family: system-ui;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);

    span {
      color: #0a66c2;
      font-weight: 600;
    }
  }
  @media (max-width: 768px) {
    margin-bottom: 220px;
  }
`;
