import { useState, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

//Change to dynamic page imports and use react.lazy and suspense
import Placeholder from "./pages/Placeholder";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

import Tutor from "./pages/Tutor";
import ViewProfile from "./pages/Tutor/ViewProfile";

import CreateQuestion from "./pages/CreateQuestion";
import PageLayout from "./pages/PageLayout";
import Profile from "./pages/Profile";
import Confiramtion from "./pages/Confirmation";

import Messages from "./pages/Messages";
import ChatRoom from "./pages/Messages/ChatRoom";

import "./App.css";

function App() {
  return (
    <div className=" h-full bg-zinc-50 font-nunito">
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="/confirmation" element={<Confiramtion />} />

        <Route path="/main" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/main/profile" element={<Profile />} />
          <Route path="/main/tutors" element={<Tutor />} />
          <Route path="/main/messages" element={<Messages />} />
          <Route path="/main/posts" element={<Posts />} />
          <Route path="/main/createpost" element={<CreateQuestion />} />

          <Route path="/main/posts/:postId" element={<Post />} />
          <Route path="/main/tutors/:tutorId" element={<ViewProfile />} />
          <Route path="/main/messages/:roomId" element={<ChatRoom />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
