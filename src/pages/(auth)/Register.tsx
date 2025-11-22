import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import register from "../../assets/images/register.webp";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  clearRegister,
  registerUser,
  setUser,
} from "../../redux/slices/authSlice";
import { toast } from "sonner";
import api from "../../lib/helpers/axiosInstance";
const Register = () => {
  const initialState = { email: "", password: "", name: "" };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, regMessage, regLoading, regError } = useSelector(
    (store: RootState) => store.auth
  );

  // -------- fetch user if already logged in ----------
  useEffect(() => {
    const fetchUser = () => {
      setLoading(true);
      api
        .get("/users/profile")
        .then((res) => {
          if (!user) {
            dispatch(setUser(res.data));
          }
        })
        .finally(() => setLoading(false));
    };

    fetchUser();
  }, []);

  // -------- if user already logged in ----------
  useEffect(() => {
    if (user) toast.error("You’re already logged in.");
  }, [user]);

  // -------- redirect if registerd ----------
  useEffect(() => {
    if (regMessage) {
      toast.success(regMessage);
      dispatch(clearRegister());
      navigate("/login");
    }
    if (regError) {
      toast.error(regError);
    }
  }, [regMessage, regError]);

  // -------- input handler ----------
  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // -------- form submit ----------
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // -------- redirect if logged in ----------
  if (user) {
    return <Navigate to="/profile" replace />;
  }
  // -------- main JSX ----------
  if (!loading)
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
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormData}
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
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
              className={`w-full bg-black text-white rounded-lg font-semibold p-2 hover:bg-gray-800 ${
                regLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {regLoading ? "submiting..." : "Sign Up"}
            </button>
            <p className="mt-6 text-center text-sm">
              Dont have an account?{" "}
              <Link to={`/login`} className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800">
          <div className="h-full flex flex-col justify-center">
            <img
              src={register}
              alt="Register to Account"
              className="h-[750px] w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
};
export default Register;
