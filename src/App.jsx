import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import { Route, Routes } from "react-router-dom";

//Change to dynamic page imports and use react.lazy and suspense
//import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
import Placeholder from "./pages/Placeholder";
//const Placeholder = lazy(() => import("./pages/Placeholder"));
//import Posts from "./pages/Posts";
const Posts = lazy(() => import("./pages/Posts"));
const Post = lazy(() => import("./pages/Post"));
//import Post from "./pages/Post";

//import Tutor from "./pages/Tutor";
const Tutor = lazy(() => import("./pages/Tutor"));
//import ViewProfile from "./pages/Tutor/ViewProfile";
const ViewProfile = lazy(() => import("./pages/Tutor/ViewProfile"));

//import CreateQuestion from "./pages/CreateQuestion";
const CreateQuestion = lazy(() => import("./pages/CreateQuestion"));
import PageLayout from "./pages/PageLayout";
//const PageLayout = lazy(() => import("./pages//PageLayout"));
//import Profile from "./pages/Profile";
const Profile = lazy(() => import("./pages/Profile"));
//import Confiramtion from "./pages/Confirmation";
const Confiramtion = lazy(() => import("./pages/Confirmation"));

//import Messages from "./pages/Messages";
const Messages = lazy(() => import("./pages/Messages"));
//import ChatRoom from "./pages/Messages/ChatRoom";
const ChatRoom = lazy(() => import("./pages/Messages/ChatRoom"));

import "./App.css";

function App() {
  return (
    <div className=" h-full bg-zinc-50 font-nunito">
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="/confirmation" element={<Confiramtion />} />

        <Route path="/main" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/main/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/main/tutors"
            element={
              <Suspense fallback={<Loader />}>
                <Tutor />
              </Suspense>
            }
          />
          <Route
            path="/main/messages"
            element={
              <Suspense fallback={<Loader />}>
                <Messages />
              </Suspense>
            }
          />
          <Route
            path="/main/posts"
            element={
              <Suspense fallback={<Loader />}>
                <Posts />
              </Suspense>
            }
          />
          <Route
            path="/main/createpost"
            element={
              <Suspense fallback={<Loader />}>
                <CreateQuestion />
              </Suspense>
            }
          />

          <Route
            path="/main/posts/:postId"
            element={
              <Suspense fallback={<Loader />}>
                <Post />
              </Suspense>
            }
          />
          <Route
            path="/main/tutors/:tutorId"
            element={
              <Suspense fallback={<Loader />}>
                <ViewProfile />
              </Suspense>
            }
          />
          <Route
            path="/main/messages/:roomId"
            element={
              <Suspense fallback={<Loader />}>
                <ChatRoom />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
