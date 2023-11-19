import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFirebase } from "../context/Context";
import styled from "styled-components";

export default function Header({ currentUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const firebase = useFirebase();

  const { signOutUser, user } = useFirebase();

  const [searchInput, setSearchInput] = useState("");

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleClick = () => {
    navigate("/profile");
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  const openUser = (user) => {
    // console.log(user);
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  useMemo(() => {
    firebase.getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  return (
    <>
      <Container>
        <Content>
          <Logo>
            <a href="/home">
              <img src="/images/home-logo.svg" alt="" />
            </a>
          </Logo>
          <Search>
            <div>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
            {searchInput.length === 0 ? (
              <></>
            ) : (
              <SearchBox>
                {filteredUsers?.length === 0 ? (
                  <div> No Results Found..</div>
                ) : (
                  filteredUsers.map((user) => (
                    <div key={user?.userID} onClick={() => openUser(user)}>
                      <img src={user?.imageLink} alt="" />
                      <p>{user?.name}</p>
                    </div>
                  ))
                )}
              </SearchBox>
            )}
          </Search>

          <Nav>
            <NavListWrap>
              <NavList
                className={location.pathname === "/home" ? "active" : ""}
                onClick={() => navigate("/home")}
              >
                <a>
                  <img src="/images/nav-home.svg" alt="" />
                  <span>Home</span>
                </a>
              </NavList>

              <NavList
                className={location.pathname === "/network" ? "active" : ""}
              >
                <a onClick={() => navigate("/network")}>
                  <img src="/images/nav-network.svg" alt="" />
                  <span>My&nbsp;Network</span>
                </a>
              </NavList>

              <NavList>
                <a>
                  <img src="/images/nav-jobs.svg" alt="" />
                  <span>Jobs</span>
                </a>
              </NavList>

              <NavList>
                <a>
                  <img src="/images/nav-messaging.svg" alt="" />
                  <span>Messaging</span>
                </a>
              </NavList>

              <NavList>
                <a>
                  <img src="/images/nav-notifications.svg" alt="" />
                  <span>Notifications</span>
                </a>
              </NavList>

              <User
                className={location.pathname === "/profile" ? "active" : ""}
              >
                <a>
                  {currentUser?.imageLink ? (
                    <img src={currentUser?.imageLink} alt="" />
                  ) : (
                    <img src="/images/placeholder.jpg" alt="" />
                  )}
                  <span>
                    {/* onClick={(prev) => setShowProfilePopup(!prev)} */}
                    Me
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>

                <ProfilePopup>
                  <Profile>
                    {currentUser?.imageLink ? (
                      <img src={currentUser?.imageLink} alt="" />
                    ) : (
                      <img src="/images/placeholder.jpg" alt="" />
                    )}
                    <div className="profileDiv">
                      <p className="name">
                        {currentUser?.name || currentUser?.displayName}
                      </p>
                      <p className="headline">{currentUser?.headline}</p>
                    </div>
                  </Profile>

                  <button className="viewProfileBtn" onClick={handleClick}>
                    View Profile
                  </button>
                  <div className="line"></div>

                  <h5>Account</h5>
                  <p>Setting & Privacy</p>
                  <p>Help</p>
                  <p>Language</p>

                  <div className="line"></div>

                  <h5>Manage</h5>
                  <p>Posts & Activity</p>
                  <p>Job Posting Account</p>

                  <div className="line"></div>
                  <button className="signOut-btn" onClick={signOutUser}>
                    Sign Out
                  </button>
                </ProfilePopup>
              </User>

              <Work>
                <a>
                  <img src="/images/nav-work.svg" alt="" />
                  <span>
                    Work
                    <img src="/images/down-icon.svg" alt="" />
                  </span>
                </a>
              </Work>
            </NavListWrap>
          </Nav>
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 5px 24px;
  top: 0;
  width: 100vw;
  z-index: 100;
  position: sticky;
  top: 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
      &:focus {
        outline: none;
        border: 2px solid #0a66c2;
        width: 100%;
      }
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 280px;
  height: auto;
  position: absolute;
  z-index: 1;
  text-align: center;
  overflow: hidden;
  margin-top: 5px;
  /* margin-bottom: 8px; */
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  /* display: none; */
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #b3b2b1;
    cursor: pointer;
    &:hover {
      background-color: #dbdad7;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    width: 100%;
    z-index: 9999;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 65px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const ProfilePopup = styled.div`
  position: absolute;
  top: 58px;
  right: 100px;
  border: 1px solid #a8a8a8;
  width: 250px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  z-index: 1000;
  justify-content: center;
  display: none;
  flex-direction: column;
  padding: 20px;
  /* width: 60px;
  height: 60px;
  border-radius: 50%; */
  img {
    width: 60px;
    height: 60px;
    margin-left: -70px;
    border-radius: 50%;
    object-fit: cover;
    
  }

  @media (max-width: 768px) {
    top: -400px;
    right: 15px;
  }

  .name {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    font-weight: 600;
    text-align: left;
    margin-top: -7px;
    font-family: system-ui;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .headline {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    margin-top: -20px;
    font-family: system-ui;
  }

  .viewProfileBtn {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 25px;
    border: 2px solid #0a66c2;
    outline: none;
    font-family: system-ui;
    font-size: 14px;
    font-weight: 600;
    color: #0a66c2;
    background-color: #f0f5fa;
    cursor: pointer;
    &:hover {
      background-color: #d4e7fa;
    }
  }

  .line {
    border-bottom: 1px solid rgba(196, 196, 196, 0.951);
    margin-top: 0px;
    width: 100%;
  }
  h5 {
    font-family: system-ui;
    font-weight: 500;
    margin-bottom: 15px;
    margin-top: 10px;
    font-size: 15px;
  }
  p {
    font-family: system-ui;
    font-weight: 400;
    margin-top: -15px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .signOut-btn {
    width: 100%;
    border: none;
    text-align: left;
    padding: 10px;
    padding-left: 13px;
    margin: 5px 2px -15px -15px;
    font-family: system-ui;
    font-weight: 600;
    font-size: 15px;
    outline: none;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  .signOut-btn:hover {
    background-color: rgba(227, 227, 227, 0.71);
    width: 114%;
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    ${ProfilePopup} {
      display: block;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  .profileDiv {
    display: flex;
    margin-top: 5px;
    flex-direction: column;
    margin-left: 14px;
    justify-content: center;
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
