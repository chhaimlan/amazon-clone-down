import {
  BookmarkBorder,
  ChatBubbleOutline,
  FavoriteBorder,
  Telegram,
} from "@material-ui/icons";
import React from "react";
import "./Rightbar.css";

function Rightbar({
  imageProfile,
  imageContent,
  username,
  subuser,
  userlike,
  usercomment,
  description,
}) {
  return (
    <div className="rightbar">
      <div className="right_container">
        <div className="right_image">
          <img src={imageProfile} alt="" />
          <h3 className="side_head">
            {username}
            <p>{subuser}</p>
          </h3>
        </div>

        <div className="right_buttom">
          <button>View Profile</button>
        </div>
      </div>
      <div className="right_content">
        <img src={imageContent} alt="" />
        <div className="right_icon">
          <div className="icon_left">
            <FavoriteBorder />
            <ChatBubbleOutline />
            <Telegram />
          </div>
          <div className="icon_right">
            <BookmarkBorder />
          </div>
        </div>
        <h5>{userlike} likes</h5>
        <h5>{usercomment}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Rightbar;
