import React, { useEffect, useState } from "react";
import styled from "styled-components";
import linkedinLogo from "../assets/linkedinLogo.png";
import googleLogo from "../assets/googleLogo.png";
import { useFirebase } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    loginUserWithEmail,
    user,
    loginWithGoogle,
    email,
    setEmail,
    password,
    setPassword,
  } = useFirebase();
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleLoginWithEmail = () => {
    loginUserWithEmail(email, password);
  };

  // const loginWithGoogle = () => {};

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src={linkedinLogo} alt="" />
        </a>
      </Nav>

      <Section>
        <Wrapper>
          <h1>Sign in</h1>
          <p>Stay updated on your professional world</p>

          <Field>
            <input
              type="text"
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <h4>Forgot password?</h4>
            <button className="emailBtn" onClick={handleLoginWithEmail}>
              Sign in
            </button>
            <h5>
              <span>or</span>
            </h5>
            <button className="googleBtn" onClick={loginWithGoogle}>
              <div>
                <img src={googleLogo} alt="" />
                <span>Continue with Google</span>
              </div>
            </button>
          </Field>
        </Wrapper>
        <OutSide>
          <p>
            New to LinkedIn?{" "}
            <span onClick={() => navigate("/signup")}> Join now </span>
          </p>
        </OutSide>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  img {
    width: 140px;
    margin: 25px 0px 0px 130px;
    @media (max-width: 768px) {
      margin-top: 100px;
      margin-bottom: 50px;
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Wrapper = styled.div`
  margin-top: 10px;
  width: 320px;
  font-family: system-ui;
  padding: 0px 20px 0px 20px;
  border-radius: 8px;
  box-shadow: 0 0 0 2px #f5f5f5;

  h1 {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 400;
    /* margin-top: -17px; */
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  input {
    height: 40px;
    margin-bottom: 25px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    font-family: system-ui;
    font-size: 18px;
    padding: 5px;
    padding-left: 15px;
  }

  input:focus {
    border: 2px solid #0a66c2;
    color: rgba(0, 0, 0, 0.7);
    outline: none;
  }

  h4 {
    //Forgot Password
    font-size: 16px;
    color: #0a66c2;
    margin-top: -15px;
    font-weight: 600;
    padding: 8px;
  }
  h4:hover {
    text-decoration: underline;
    cursor: pointer;
    background-color: #deedfc;
    border-radius: 20px;
    width: fit-content;
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
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.5);
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
`;

const OutSide = styled.div`
  margin-top: 5px;
  p {
    font-family: system-ui;
    font-size: 16px;
    font-weight: 400;

    span {
      color: #0a66c2;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
