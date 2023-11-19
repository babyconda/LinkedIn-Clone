import React, { useEffect } from "react";
import styled from "styled-components";
import mainImage from "../assets/imageMain.svg";
import linkedinLogo from "../assets/linkedinLogo.png";
import miniLogo from "../assets/miniLogo.png";
import googleLogo from "../assets/googleLogo.png";
import { useFirebase } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function WelcomePage() {
  const firebase = useFirebase();
  const { email, setEmail, password, setPassword } = useFirebase();
  const navigate = useNavigate();
  // console.log(firebase);

  useEffect(() => {
    if (firebase.user) navigate("/home");
  }, [firebase, navigate]);

  const loginWithGoogle = () => {
    try {
      firebase.loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setEmail("recruiter@example.com");
    setPassword("123456");
    navigate("/signin");
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src={linkedinLogo} alt="" className="mainLogo" />
          <img src={miniLogo} alt="" className="miniLogo" />
        </a>
        <div>
          <Join onClick={() => navigate("/signup")}>Join now</Join>
          <SignIn onClick={() => navigate("/signin")}>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1> Welcome to your professional community</h1>
          <img src={mainImage} alt="" />
        </Hero>
        <Form>
          <Google onClick={loginWithGoogle}>
            <img src={googleLogo} alt="" />
            Sign in with Google
          </Google>

          {/* <Button>Log&nbsp;in&nbsp;as&nbsp;Recruiter</Button> */}
          <Button onClick={handleClick}>Recruiter's&nbsp;Login</Button>
        </Form>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px;
  margin-top: 20px;
  overflow: hidden;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
    .mainLogo {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .miniLogo {
      display: none;
      width: 50px;
      @media (max-width: 768px) {
        margin-left: 15px;
        display: block;
      }
    }
    @media (max-width: 768px) {
      padding: 0 5px;
    }

    img {
      width: 150px;
    }
  }
`;

const Join = styled.a`
  font-size: 20px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
  @media (max-width: 768px) {
    /* padding: 0 5px; */
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
  padding: 5px 24px;
  padding-bottom: 8px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 800px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }
  img {
    width: 600px;
    height: 570px;
    position: absolute;
    bottom: 150px;
    right: -150px;
    z-index: -1;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    /* margin-top: 120px; */
    margin: 120px 15px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  margin-top: -60px;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }

  img {
    width: 25px;
    margin-right: 20px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  background-color: red;
  /* background-color: #0a66c2; */
  align-items: center;
  margin-top: 30px;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  border: none;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    /* background-color: #ffd9d9; */
    background-color: #fa5555;
    /* color: #ff0000; */
    color: white;
  }
`;
