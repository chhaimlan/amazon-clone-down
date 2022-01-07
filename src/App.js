import React, { useState, useEffect } from "react";
import "./App.css";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, orderBy, query, onSnapshot } from "@firebase/firestore";
import Post from "./Post";
import { Avatar, Button, Input } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Imageupload from "./Imageupload";
import Rightbar from "./Rightbar";
import {
  AddBoxOutlined,
  FavoriteBorder,
  Home,
  HourglassFull,
  Search,
} from "@material-ui/icons";
import Storeel from "./Storeel";
//import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [openSignin, setOpensignin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //user has logged in..
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    onSnapshot(
      collection(db, "posts"),
      query(orderBy("timestamp", "desc")),
      (snap) => {
        setPosts(
          snap.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      }
    );
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(authUser.user, {
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );

    setOpensignin(false);
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup-pp">
            <center>
              <img
                className="app_Image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfwHXF-G1hHL7A8-hLOloaN6I1LjyNo7DFQ&usqp=CAU"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpensignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup-pp">
            <center>
              <img
                className="app_Image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfwHXF-G1hHL7A8-hLOloaN6I1LjyNo7DFQ&usqp=CAU"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign in</Button>
          </form>
        </div>
      </Modal>
      <div className="app_header">
        <img
          className="app_Image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfwHXF-G1hHL7A8-hLOloaN6I1LjyNo7DFQ&usqp=CAU"
          alt=""
        />
        <div className="app_header_center">
          <Search />
          <input type="text" placeholder="Search name......" />
        </div>
        <div className="app_header_Icons">
          <Home />
          <img src="/img/messagger.png" alt="" />
          <AddBoxOutlined />
          <HourglassFull />
          <FavoriteBorder />
          <Avatar
            src="https://lh3.googleusercontent.com/ogw/ADea4I7uMbKP1_XStzAzV6FXYFhZu2rLvUO_froY-W53Uw=s32-c-mo"
            alt=""
          />
        </div>
        <div className="app_header_sign">
          {user ? (
            <Button onClick={() => signOut(auth)}>Logout</Button>
          ) : (
            <div className="app_login">
              <Button onClick={() => setOpensignin(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
          )}
        </div>
      </div>
      <div className="app_post">
        <div className="app_postleft">
          <div className="app_story">
            <Storeel />
          </div>
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app_postrigh">
          <Rightbar
            imageProfile="https://yt3.ggpht.com/yti/APfAmoFNZ9Dg8xH3Z_Ls7p7fs0oBxyMA0GZPVSQDCULs_A=s88-c-k-c0x00ffffff-no-rj-mo"
            imageContent="https://www.w3care.com/images/uploads/blog/_listing/Web_Design_Process_Step_by_step_-_W3care_Technologies_Pvt._Ltd_.png"
            username="chhaimlan"
            subuser="chhaimlan"
            userlike="Long"
            usercomment="chhaimlong"
            description="Programming isn't about what you know; it's about what you can figure
          out. The only way to learn a new programming language is by writing
          programs in it. Sometimes it's better to leave something alone, to
          pause, and that's very true of programming. In some ways, programming
          is like painting. You start with a blank canvas and certain basic raw
          materials. You use a combination of science, art, and craft to
          determine what to do with them. Testing leads to failure, and failure
          leads to understanding. The best error message is the one that never
          shows up. The most damaging phrase in the language is.. it's always
          been done this way"
          />
          <Rightbar
            imageProfile="https://cdn.resfu.com/scripts/tmp_images/goal_messi-real-sociedad-barcelona-la-liga-27112016_1kcnrmkafx91o1jpsarsw4cxii.jpg?size=1000x&ext=jpeg"
            imageContent="https://learn.g2crowd.com/hubfs/data-analysis-process.png"
            username="messi"
            subuser="messi"
            userlike="cambodia fan"
            usercomment="hengsong"
            description="
            An intelligent person is never afraid or ashamed to find errors in his understanding of things.
            Today people are information-rich and time-poor.
            Information is the oil of the 21st century, and analytics is the combustion engine.
            Data are becoming the new raw material of business.
            An organization's ability to learn, and translate that learning into action rapidly, is the ultimate competitive advantage.
            The most valuable commodity I know of is information.
            Too often we forget that genius, too, depends upon the data within its reach, that even Archimedes could not have devised Edison’s inventions.
            Without big data analytics, companies are blind and deaf, wandering out onto the web like deer on a freeway.
            Data is the new currency, and it’s the medium of exchange between consumers and marketers.
            I never guess, it is a shocking habit—destructive to the logical faculty.
            If you torture the data long enough, it will confess.
            War is 90% information.
            I never guess. It is a capital mistake to theorize before one has data. Insensibly one begins to twist facts to suit theories, instead of theories to suit facts.
            We are drowning in information and starving for knowledge.
            Behind each data point is a living, breathing human.
            Develop a passion for learning. If you do, you will never cease to grow.�? Anthony J.
            The future belongs to those who see possibilities before they become obvious.
            A point of view can be a dangerous luxury when substituted for insight and understanding.
            In God we trust, all others must bring data.
            Facts do not cease to exist because they are ignored.
            Statistics are like bikinis. What they reveal is suggestive, but what they conceal is vital.
            "
          />
          <Rightbar
            imageProfile="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
            imageContent="https://i2.wp.com/uxdworld.com/wp-content/uploads/2021/06/3-1.png?resize=696%2C630&ssl=1"
            username="ronaldo"
            subuser="ronaldo"
            userlike="chhaimlan"
            usercomment="mohasomnang"
            description="Styles come and go. Good design is a language, not a style.
           Massimo Vignelli, Italian Designer.
           A design system isn’t a project. It’s a product serving products.
           Here’s the simple truth: you can’t innovate on products without first innovating the way you build them.
           A design system acts as the connective tissue that holds together your entire platform.
           True collaboration isn’t throwing designs over the wall. It’s designers, engineers, and the rest of the team sharing the responsibility to build a quality product. Reduce the barriers, support and empower them, and designers who code will become the norm.
           The more decisions you put off, and the longer you delay them, the more expensive they become.
           To do that, look at the big picture first. Capture the aesthetic qualities as a whole and identify the patterns that are particularly effective at expressing it. Then you can follow a similar process for all the styles: start with the key roles a style has in the context of your product, audit existing instances, and then define patterns and building blocks. The guiding principles help to connect everything together and link it back to the purpose.           
           "
          />
        </div>
      </div>

      {user?.displayName ? (
        <Imageupload username={user.displayName} />
      ) : (
        <h3 className="head-bottom">Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
