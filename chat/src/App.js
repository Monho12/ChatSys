import { Header } from "./components";
import { Routes, Route } from "react-router-dom";
import { Chat, CreatePost, Home, Login, Posts, Profile, Signup } from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile/">
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
