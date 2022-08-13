import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage, SharedLayout } from "./pages";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
