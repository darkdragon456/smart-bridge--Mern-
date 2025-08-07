import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
const Auth = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-400 text-gray-600"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-2xl shadow-2xl border border-blue-200 bg-white/90 backdrop-blur-md"
      >
        <p className="text-3xl font-bold m-auto text-blue-700 mb-2 tracking-wide">
          {state === "login" ? "Login to Grocery Mart" : "Register for Grocery Mart"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p className="font-medium text-blue-700">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Type your name"
              className="border border-blue-200 rounded w-full p-2 mt-1 outline-blue-500 bg-blue-50"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p className="font-medium text-blue-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Type your email"
            className="border border-blue-200 rounded w-full p-2 mt-1 outline-blue-500 bg-blue-50"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p className="font-medium text-blue-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Type your password"
            className="border border-blue-200 rounded w-full p-2 mt-1 outline-blue-500 bg-blue-50"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            New to Grocery Mart?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        )}
        <button className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer font-semibold text-lg shadow">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};
export default Auth;
