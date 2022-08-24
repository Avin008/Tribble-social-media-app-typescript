import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./components";
import {
  EditProfile,
  ExplorePage,
  HomePage,
  Login,
  PostPage,
  ProfilePage,
  SavedPostPage,
  SharedLayout,
  Signup,
} from "./pages";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="profile/:id"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="explore"
            element={
              <RequireAuth>
                <ExplorePage />
              </RequireAuth>
            }
          />
          <Route
            path="saved-posts/:collectionID"
            element={
              <RequireAuth>
                <SavedPostPage />
              </RequireAuth>
            }
          />
          <Route
            path="edit-profile/:userID"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="post/:postID"
            element={
              <RequireAuth>
                <PostPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
