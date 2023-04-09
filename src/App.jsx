import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import { Route, Routes } from "react-router-dom";

//import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
import Placeholder from "./pages/Placeholder";
//const Placeholder = lazy(() => import("./pages/Placeholder"));

//import Tutor from "./pages/Tutor";
const Tutor = lazy(() => import("./pages/Tutor"));
//import ViewProfile from "./pages/Tutor/ViewProfile";
const ViewProfile = lazy(() => import("./pages/Tutor/ViewProfile"));

import PageLayout from "./pages/PageLayout";
import MessageLayout from "./pages/MessageLayout";
//const PageLayout = lazy(() => import("./pages//PageLayout"));
//import Profile from "./pages/Profile";
const Profile = lazy(() => import("./pages/Profile"));
//import Confiramtion from "./pages/Confirmation";
const Confiramtion = lazy(() => import("./pages/Confirmation"));

//import Messages from "./pages/Messages";
//const Messages = lazy(() => import("./pages/Messages"));
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
          <Route path="/main/messages" element={<MessageLayout />}>
            <Route
              path="/main/messages/:roomId"
              element={
                <Suspense fallback={<Loader />}>
                  <ChatRoom />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/main/tutors/:tutorId"
            element={
              <Suspense fallback={<Loader />}>
                <ViewProfile />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
