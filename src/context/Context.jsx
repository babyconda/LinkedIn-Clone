import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./FirebaseConfig";
import { toast } from "react-toastify";
import getUniqueID from "../helpers/getUniqueID";

//============== Creating Context ================================

const UserContext = createContext({});
export const useFirebase = () => useContext(UserContext);

//============== Initializing Firestore Auth ======================

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

//-----------------FireStore Collection-----------------------------------
const userRef = collection(firestore, "users");
const postRef = collection(firestore, "posts");
const likeRef = collection(firestore, "likes");
const commentsRef = collection(firestore, "comments");
const connectionRef = collection(firestore, "connections");

//---------------------Storing Data------------------------------

const postUserData = async (object, uid) => {
  let userToAdd = doc(userRef, uid);
  await setDoc(userToAdd, object)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

const postStatus = (object) => {
  // Storing data form main share box

  addDoc(postRef, object)
    .then(() => {
      console.log("Document has been added successfully..");
    })
    .catch((err) => {
      console.log(err);
    });
};

//----------------Getting Data from firebase-------------------

const getStatus = (setAllStatus) => {
  onSnapshot(postRef, (res) => {
    setAllStatus(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

const getCurrentUser = (setCurrentUserData) => {
  const currentEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (res) => {
    setCurrentUserData(
      res.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id };
        })
        .filter((item) => {
          return item.email === currentEmail;
        })[0]
    );
  });
};

//-------------------Get Liked by User-----------------

const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      const likesCount = likes?.length;
      const isLiked = likes.some((like) => like.userId === userId);
      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (error) {
    console.log(error);
  }
};

//-----------------Getting Comments----------------------------
const getComments = (postId, setRealComments, setCommentCount) => {
  try {
    const singlePostQuery = query(commentsRef, where("postId", "==", postId));
    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc?.id,
          ...doc?.data(),
        };
      });
      const commentCount = comments?.length;
      setCommentCount(commentCount);
      setRealComments(comments);
    });
  } catch (error) {
    console.log(error);
  }
};

//---------------Getting ALL Users---------------------------

const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (res) => {
    setAllUsers(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

//----------------Getting Connections--------------------------
const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId && userId
      );
      setIsConnected(isConnected);
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------Name to Profile-------------------------
const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

//================ Profile Update =======================

const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, payload)
    .then(() => {
      console.log("Profile Has Been Updated....");
    })
    .catch((err) => {
      console.log(err);
    });
};

//-------------------Update the Post-------------------------

const updatePost = (id, status, setOpen, postImage) => {
  let docToUpdate = doc(postRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    setOpen(false);
  } catch (error) {
    console.log(error);
  }
};
//================ Profile Update =======================

//----------- Upload Profile Image----------
const uploadImage = (
  file,
  userID,
  setProgress,
  setModalOpen,
  setImagePreview
) => {
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editProfile(userID, { imageLink: response });
        setProgress(0);
        setModalOpen(false);
        setImagePreview(null);
      });
    }
  );
};
//----------- Upload Cover Image----------
const uploadCoverImage = (
  file,
  userID,
  setProgress,
  setOpen,
  setCoverImagePrev
) => {
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editProfile(userID, { coverImageLink: response });
        setProgress(0);
        setOpen(false);
        setCoverImagePrev(null);
      });
    }
  );
};

//--------------------Uploading PostImage---------------------
const uploadPostImage = (file, setImagePostLink, setProgress) => {
  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setImagePostLink(response);
      });
    }
  );
};

//---------------------Like POST-----------------------------

const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------------Post Comment---------------------
const postComment = (postId, comment, timeStamp, name, userId) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------Adding Connections------------------------
const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
    setDoc(connectionToAdd, { userId, targetId });
    console.log("Connection is Added");
  } catch (error) {
    console.log(error);
  }
};

const deleteConnection = (userId, targetId) => {
  let docToDelete = doc(connectionRef, `${userId}_${targetId}`);
  try {
    deleteDoc(docToDelete);
  } catch (error) {
    console.log(error);
  }
};

//---------------------Delete Post--------------------------
const deletePost = (id) => {
  let docToDelete = doc(postRef, id);
  try {
    deleteDoc(docToDelete);
  } catch (error) {
    console.log(error);
  }
};

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("userEmail", user.email);
      } else {
        setUser(null);
        localStorage.removeItem("userEmail");
      }
    });
  }, []);

  useMemo(() => {
    getCurrentUser(setCurrentUserData);
    if (currentUserData) {
      setIsLoading(false);
      // localStorage.setItem("userData", JSON.stringify(currentUser));
      //   console.log("Context uSer Data", currentUserData);
    }
  }, [isLoading]);

  //============== User Registration ======================

  const registerUserWithEmail = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        postUserData(
          {
            userID: getUniqueID(),
            name: name,
            email: result.user.email,
          },
          result.user.uid
        );
        getCurrentUser(setCurrentUserData);
        toast.success("Registration Successfull..!");
      })
      .catch((error) => toast.error("Invalid Credentials.."));
  };

  const loginUserWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        getCurrentUser(setCurrentUserData);
        toast.success("Login Successfull...!");
      })
      .catch((error) => toast.error("Invalid Credentials.."));
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull...!");
      })
      .catch((error) => toast.error("Error "));
  };

  const [allGoogle, setAllGoogle] = useState(null);
  useMemo(() => {
    getAllUsers(setAllGoogle);
  }, []);

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      if (allGoogle.some((item) => item.email === result.user.email)) {
        getCurrentUser(setCurrentUserData);
        return;
      } else {
        postUserData(
          {
            userID: getUniqueID(),
            name: result.user.displayName,
            email: result.user.email,
            imageLink: result.user.photoURL,
          },
          result.user.uid
        );
        getCurrentUser(setCurrentUserData);
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUserWithEmail,
        loginUserWithEmail,
        signOutUser,

        loginWithGoogle,
        postUserData,
        currentUserData,
        setCurrentUserData,
        uploadCoverImage,
        editProfile,
        uploadImage,
        getStatus,
        postStatus,
        getConnections,
        getComments,
        getLikesByUser,
        getAllUsers,
        likePost,
        uploadPostImage,
        updatePost,
        postComment,
        getSingleUser,
        getSingleStatus,
        getCurrentUser,
        addConnection,
        deleteConnection,
        email,
        setEmail,
        password,
        setPassword,
        deletePost
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
