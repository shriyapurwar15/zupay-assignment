import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useAuthTokenStore } from "@/store";

const Navbar = () => {
  const token = useAuthTokenStore((state) => state.token);
  const setToken = useAuthTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  };

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <div className="flex  flex-row justify-between py-[14px] ">
      <Link to={"/"}>
        <img
          src="/zuAiLogo.png"
          className="cursor-pointer"
          alt="ZuAi"
          style={{ height: "44px", width: "116px" }}
        />
      </Link>
      <div className="px-4 gap-2 flex flex-row items-center">
        {token ? (
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              navigate("/");
            }}
            className="bg-[#6947bf]   text-base rounded-full font-semibold hover:bg-purple-800 border-2 text-white"
          >
            Logout
          </Button>
        ) : (
          <Link to={"/sign-in"}>
            <Button className="bg-white  border-[#eaf0f2] hover:bg-slate-200 text-base rounded-full font-semibold border-2 text-[#5b6170]">
              Login
            </Button>
          </Link>
        )}
        {!token && (
          <Link to={"/sign-up"}>
            <Button className="bg-[#6947bf]  text-base rounded-full font-semibold hover:bg-purple-800 border-2 text-white">
              Join Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
