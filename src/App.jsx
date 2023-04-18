import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
import Placeholder from "./pages/Placeholder";

const Tutor = lazy(() => import("./pages/Tutor"));

const ViewProfile = lazy(() => import("./pages/Tutor/ViewProfile"));

import PageLayout from "./pages/PageLayout";

const Profile = lazy(() => import("./pages/Profile"));

const Confiramtion = lazy(() => import("./pages/Confirmation"));

const Messages = lazy(() => import("./pages/Messages"));

const ChatRoom = lazy(() => import("./pages/Messages/ChatRoom"));

const Sessions = lazy(() => import("./pages/Sessions"));

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
            path="/main/sessions"
            element={
              <Suspense>
                <Sessions />
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
