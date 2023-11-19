import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { BsShareFill, BsDot } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { RiSendPlaneFill, RiDeleteBin6Line } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { useFirebase } from "../context/Context";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
// import ShareSocials from "./ShareSocials";

export default function ShareCard({
  posts,
  currentUser,
  setOpen,
  open,
  getEditData,
}) {
  const firebase = useFirebase();
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [realComments, setRealComments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [commentCount, setCommentCount] = useState(null);
 

  const navigate = useNavigate();
  let location = useLocation();
  const handleLikePost = () => {
    firebase.likePost(currentUser?.userID, posts.id, liked);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    firebase.postComment(
      posts?.id,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name,
      currentUser?.userID
    );
    setComment("");
  };

  useMemo(() => {
    firebase.getLikesByUser(
      currentUser?.userID,
      posts?.id,
      setLiked,
      setLikesCount
    );
    firebase.getComments(posts.id, setRealComments, setCommentCount);
    firebase.getAllUsers(setAllUsers);
  }, [currentUser?.userID, posts?.id]);

  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    firebase.getConnections(currentUser?.userID, posts?.userID, setIsConnected);
  }, [currentUser?.userID, posts?.userID]);

  return (
    <Container>
      {isConnected || currentUser?.userID === posts?.userID ? (
        <>
          <SharedActor>
            <a>
              {allUsers
                .filter((item) => item?.id === posts?.userID)
                .map((item) => item?.imageLink)[0] === undefined ? (
                <img src={"./images/placeholder.jpg"} alt="" />
              ) : (
                <img
                  src={
                    allUsers
                      .filter((item) => item?.id === posts?.userID)
                      .map((item) => item?.imageLink)[0]
                  }
                  alt=""
                />
              )}
              <div>
                <span
                  style={{
                    fontSize: "14px",
                  }}
                  onClick={() =>
                    navigate("/profile", {
                      state: { id: posts?.userID, email: posts.userEmail },
                    })
                  }
                >
                  {
                    allUsers.filter((user) => user?.id === posts?.userID)[0]
                      ?.name
                  }
                </span>
                <span>
                  {
                    allUsers.filter((user) => user?.id === posts?.userID)[0]
                      ?.headline
                  }
                </span>
                <span>{posts.timeStamp}</span>
              </div>
            </a>

            {currentUser?.userID === posts?.userID &&
            location?.pathname !== "/profile" ? (
              <Action>
                <TiPencil
                  className="pen"
                  onClick={() => {
                    getEditData(posts);
                  }}
                />
                <RiDeleteBin6Line
                  className="delete"
                  onClick={() => firebase.deletePost(posts?.id)}
                />
              </Action>
            ) : (
              <></>
            )}
          </SharedActor>
          <Description>{posts.status}</Description>
          <SharedImg>
            <a>
              {!posts.postImage && posts.videoLink ? (
                <ReactPlayer width={"100%"} url={`https:${posts.videoLink}`} />
              ) : (
                posts.postImage && <img src={posts.postImage} alt="" />
              )}
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                {likesCount === 0 ? (
                  <></>
                ) : (
                  <>
                    <img
                      src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                      alt=""
                    />
                    <span>{likesCount}</span>
                  </>
                )}
                {/* <img
              src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
              alt=""
            /> */}
              </button>
            </li>

            <li
              className="comment"
              onClick={() => setShowComments(!showComments)}
            >
              <span>{commentCount}</span>
              <a> Comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button onClick={handleLikePost}>
              {liked ? (
                <>
                  <AiFillLike style={{ fontSize: "20px", color: "#0a66c2" }} />
                  <span style={{ color: "#0a66c2 " }}>Like</span>
                </>
              ) : (
                <>
                  <AiOutlineLike style={{ fontSize: "20px" }} />
                  <span>Like</span>
                </>
              )}
            </button>
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? (
                <>
                  <BiCommentDetail fontSize="20px" color="#0a66c2" />
                  <span style={{ color: "#0a66c2", fontWeight: 600 }}>
                    Comments
                  </span>
                </>
              ) : (
                <>
                  <BiCommentDetail style={{ fontSize: "20px" }} />
                  <span>Comments</span>
                </>
              )}
            </button>
            {/* <button><ShareSocials /></button> */}
            <button>
              <RiSendPlaneFill style={{ fontSize: "20px" }} />
              <span>Send</span>
            </button>
          </SocialActions>
          {showComments ? (
            <CommentSection>
              <CommentBox>
                {currentUser.imageLink ? (
                  <img src={currentUser.imageLink} alt="" />
                ) : (
                  <img src={"./images/placeholder.jpg"} alt="" />
                )}
                <input
                  placeholder="Add a Comment..."
                  onChange={getComment}
                  name="comment"
                  value={comment}
                />
              </CommentBox>
              <button
                onClick={addComment}
                disabled={comment.length > 0 ? false : true}
                className={comment.length > 0 ? "gray" : "blue"}
              >
                Add Comment{" "}
              </button>
              <CommentShow>
                {realComments.length > 0 ? (
                  realComments.map((comment, id) => {
                    return (
                      <CommentDown key={id}>
                        <div className="commentMain">
                          {allUsers
                            .filter((item) => item.id === comment?.userId)
                            .map((item) => item?.imageLink)[0] === undefined ? (
                            <img src={"./images/placeholder.jpg"} alt="" />
                          ) : (
                            <img
                              src={
                                allUsers
                                  .filter((item) => item.id === comment?.userId)
                                  .map((item) => item.imageLink)[0]
                              }
                              alt=""
                            />
                          )}
                          <div className="commentAll">
                            <div className="commentName">
                              <h1>{comment.name}</h1>
                              <h5>{comment.timeStamp}</h5>
                            </div>
                            <h3>{comment.comment}</h3>
                          </div>
                        </div>
                      </CommentDown>
                    );
                  })
                ) : (
                  <></>
                )}
              </CommentShow>
            </CommentSection>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #fff;
  border-radius: 5px;
  border: none;
  /* box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%); */
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 10px 10px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      .userName {
        font-size: 25px;
      }
      span {
        text-align: left;
        font-size: 18px;
        &:first-child {
          text-transform: capitalize;
          /* font-size: 25px; */
          font-weight: 700;
          color: rgba(0, 0, 0, 1);

          &:hover {
            color: #0a66c2;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 10px;
    font-size: 23px;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      background-color: white;
      span {
        margin-left: 5px;
        font-family: system-ui;
      }
    }
  }
  .comment {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #0a66c2;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    /* color: #0a66c2; */
    color: rgba(0, 0, 0, 0.65);
    border: none;
    background-color: white;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  button {
    width: 200px;
    height: 35px;
    border-radius: 30px;
    border: none;
    outline: none;
    background-color: #0a66c2;
    color: white;
    margin: 0px 0px 10px 10px;
  }
`;
const CommentBox = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px;
    object-fit: cover;
  }
  input {
    border: 1px solid #c7c7c7;
    color: #5e5e5e;
    width: 100%;
    height: 40px;
    border-radius: 30px;
    padding-left: 15px;
    margin: 0px 8px 0px 0px;
    font-family: system-ui;
    font-size: 14px;
    &:focus {
      outline: 1px solid #0a66c2;
      border: none;
    }
  }
`;

const CommentShow = styled.div`
  padding: 5px;
`;
const CommentDown = styled.div`
  .commentMain {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  .commentAll {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #ededed;
    padding: 8px;
    margin: 5px;
    border-radius: 5px;
    text-align: left;
    h3 {
      font-size: 13px;
      color: #696969;
      font-family: system-ui;
    }
  }
  .commentName {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 16px;
      color: #404040;
      font-family: system-ui;
    }
    h5 {
      font-size: 11px;
      color: #696969;
      font-family: system-ui;
    }
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  font-weight: 300;
  padding: 5px;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 50%;
  .pen {
    width: 35px;
    height: 35px;
    padding: 5px;
    margin-right: 10px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .delete {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;
