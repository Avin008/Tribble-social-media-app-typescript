import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
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
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="saved-posts" element={<SavedPostPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
