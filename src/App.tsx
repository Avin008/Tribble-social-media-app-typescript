import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  ExplorePage,
  HomePage,
  ProfilePage,
  SavedPostPage,
  SharedLayout,
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
      </Routes>
    </div>
  );
}

export default App;
