import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import login from "@/assets/images/login.webp";
import { clearLogin, loginUser } from "@/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import type { LoginInput } from "@/shared/types";

const Login = () => {
  const initialState: LoginInput = { email: "", password: "" };
  const [formData, setFormData] = useState<LoginInput>(initialState);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loginMessage, loginLoading } = useSelector(
    (store: RootState) => store.auth
  );

  // -------- login redirect handler ----------
  const location = useLocation();
  const redirectFromState = (location.state as { from?: string } | null)?.from;
  const queryRedirect =
    new URLSearchParams(location.search).get("redirect") || "profile";
  const redirect = redirectFromState || queryRedirect;

  // Show a notice when the user was sent here from a protected route
  useEffect(() => {
    if (!redirectFromState && queryRedirect === "profile") return;

    const target = redirectFromState || queryRedirect;
    const isCheckout = target === "/checkout" || target === "checkout";
    const isProfile = target === "/profile" || target === "profile";

    toast.info(
      isCheckout
        ? "Please login first to continue with checkout."
        : isProfile
        ? "Please login first to access your profile."
        : "Please login first to continue."
    );
  }, [redirectFromState, queryRedirect]);

  useEffect(() => {
    if (loginMessage) {
      const targetPath =
        redirect.startsWith("/")
          ? redirect
          : redirect === "profile"
          ? "/profile"
          : redirect === "checkout"
          ? "/checkout"
          : "/";

      navigate(targetPath);

      dispatch(clearLogin());
    }
  }, [loginMessage, dispatch, navigate, redirect]);

  // -------- input handler ----------
  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -------- form submit ----------
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // -------- main JSX ----------

  return (
      <div className="flex">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
          >
            <div className="flex justify-center mb-6">
              <h2 className="text-xl font-medium">Rabbit</h2>
            </div>

            <p className="text-center mb-6">
              Enter your username and password to login
            </p>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormData}
                className="w-full p-2 border rounded"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormData}
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-black text-white rounded-lg font-semibold p-2 hover:bg-gray-800 hoverEffect ${
                loginLoading ? "opacity-50" : ""
              }`}
              disabled={loginLoading}
            >
              {loginLoading ? "submiting..." : "Sign In"}
            </button>

            <p className="mt-6 text-center text-sm">
              Dont have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block w-1/2 bg-gray-800">
          <div className="h-full flex flex-col justify-center">
            <img
              src={login}
              alt="Login to Account"
              className="h-[750px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
};

export default Login;
