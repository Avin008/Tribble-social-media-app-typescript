import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./components";
import {
  EditProfile,
  ExplorePage,
  HomePage,
  Login,
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
            path="profile"
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
            path="saved-posts"
            element={
              <RequireAuth>
                <SavedPostPage />
              </RequireAuth>
            }
          />
          <Route
            path="edit-profile"
            element={
              <RequireAuth>
                <EditProfile />
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
