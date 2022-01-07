import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import "./Post.css";
import {
  BookmarkBorder,
  ChatBubbleOutline,
  FavoriteBorder,
  Telegram,
} from "@material-ui/icons";

function Post({ postId, caption, username, imageUrl, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log("Post user", user);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = onSnapshot(
        collection(db, "posts", postId, "comments"),
        (snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        }
      );
    }
    return () => {
      unsubscribe();
    };
    //one way for get data from firebase
    // onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) => {
    //   setComments(snapshot.docs.map((doc) => doc.data()));
    // });
    //}
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    //two collection
    addDoc(collection(db, "posts", postId, "comments"), {
      text: comment,
      username: user.displayName,
      tiemstamp: serverTimestamp(),
    });
    query(orderBy("timestamp", "desc")); //not working

    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className="post_avatar" alt="Ronado" src={imageUrl} />
        <h3>{username}</h3>
      </div>
      <img src={imageUrl} alt="" className="post_image" />
      <div className="favorite_icons">
        <div className="icon_left">
          <FavoriteBorder />
          <ChatBubbleOutline />
          <Telegram />
        </div>
        <div className="icon_right">
          <BookmarkBorder />
        </div>
      </div>
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post_comments">
        {comments.map((coment) => (
          <p>
            <strong>{coment.username}</strong> {coment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            type="submit"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
