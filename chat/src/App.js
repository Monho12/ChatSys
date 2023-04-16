import { Header } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  Chat,
  CreatePost,
  Explore,
  Home,
  Login,
  Posts,
  Profile,
  Signup,
} from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile/">
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
