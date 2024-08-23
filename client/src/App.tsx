import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import BlogPostPage from "./pages/BlogPostPage";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex   flex-row h-full items-center">
          <Sidebar />
          <div className="bg-[#e5ecf3] rounded-tl-xl  w-full h-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/blogs/:blogId" element={<BlogPostPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
