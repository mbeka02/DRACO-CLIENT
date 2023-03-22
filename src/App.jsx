import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Placeholder from "./pages/Placeholder";
import Posts from "./pages/Posts";
import Post from "./pages/Post";

import Tutor from "./pages/Tutor";
import ViewProfile from "./pages/Tutor/ViewProfile";

import CreateQuestion from "./pages/CreateQuestion";
import PageLayout from "./pages/PageLayout";
import Profile from "./pages/Profile";
import Confiramtion from "./pages/Confirmation";

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
          <Route path="/main/posts" element={<Posts />} />
          <Route path="/main/createpost" element={<CreateQuestion />} />

          <Route path="/main/posts/:postId" element={<Post />} />
          <Route path="/main/tutors/:tutorId" element={<ViewProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
