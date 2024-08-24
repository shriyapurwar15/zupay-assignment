import { Button } from "@/components/ui/button";
import { useAuthTokenStore } from "@/store";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BlogType {
  _id: string;
  title: string;
  text: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const token = useAuthTokenStore((state) => state.token);
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/posts/`
      );
      setBlogs(data);
    } catch (error) {
      toast.error("unable to load blogs");
    }
  };
  const trimmer = (text : string) =>{
    if(text.length > 100){
      return text.substring(0, 1000) + '...'
    }
    return text
  }
  const handleClick = ()=>{
    if(!token){
      toast.warning("Sign-in first to create a blog post")
      navigate('/sign-in')
    }
    else {
      navigate("/blogs/create")
    }
  }
  useEffect(() => {
    // checkToken();
    fetchBlogs();
  }, []);
  return (
    <div className="flex flex-col justify-center mb-3  bg-[#e5ecf3] items-center ">
      <div className="w-full flex-row justify-end flex   items-end p-2 px-4">
        <Button onClick={handleClick} className="flex flex-row items-center gap-1 justify-center bg-[#6947bf]   text-base rounded-full font-semibold hover:bg-purple-800 border-2 text-white">Create Post <PlusCircle size={15}/></Button>
      </div>
      <div className="flex mt-6 flex-col w-full md:px-80 px-5 items-center font-extrabold text-3xl gap-3">
        <div className="flex flex-col items-start  ">
          <div className="flex flex-col items-start justify-start ">
            <span className="text-[#7a8196] w-fit py-1 px-3 font-medium text-base border-2 border-[#c1ccd6] rounded-full">
              Useful Resources
            </span>
            <h1 className="w-fit">
              Why should I use Flashcards for <br /> revision?
            </h1>
            <div className="flex flex-row w-fit gap-8">
              <div className="flex flex-col">
                <p className="text-[#5B6170] font-semibold text-sm">
                  Published
                </p>
                <p className="text-[#7A8196] font-medium text-xs">
                  12 days ago
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-[#5B6170] font-semibold text-sm">
                  Read time
                </p>
                <p className="text-[#7A8196] font-medium text-xs">4 mins</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  gap-6 mt-4">
            {blogs &&
              blogs.map((blog) => (
                <div
                  className="bg-white shadow-xl p-5 cursor-pointer flex-col flex gap-2 rounded-xl "
                  key={blog._id}
                  onClick={()=>navigate(`/blogs/${blog._id}`)}
                >
                  <p className="text-[#1E2026] font-bold text-2xl ">
                    {blog.title}
                  </p>
                  <p className="font-normal flex text-base">{trimmer(blog.text)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
