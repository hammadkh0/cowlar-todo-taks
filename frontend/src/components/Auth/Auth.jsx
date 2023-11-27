import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../services/authApi";

// eslint-disable-next-line react/prop-types
export const LoginForm = ({ navigate }) => {
  const VITE_USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = await login(VITE_USER_SERVICE_URL, email, password);

    setLoading(false);

    if (data === null) return;

    setTimeout(() => {
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, image: data.image }));
      navigate("/");
    }, 1500);
  };
  return (
    <>
      <div className=" min-h-screen flex items-center justify-center opacity-90">
        <div className="auth-card">
          <ToastContainer />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="auth-input"
              />
            </div>

            <button className="auth-btn" type="submit">
              {!loading ? "Login" : "Logging in...."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
export const SignupForm = ({ navigate }) => {
  const VITE_USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ name, email, password, imagePreview });

    const data = await signup(VITE_USER_SERVICE_URL, name, email, password, imagePreview);

    setLoading(false);
    if (data === null) return;

    setTimeout(() => {
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, image: data.image }));
      navigate("/");
    }, 1500);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  return (
    <>
      <div className=" min-h-screen flex items-center justify-center opacity-90">
        <div className="auth-card">
          <ToastContainer />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup</h2>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                autoComplete="on"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                autoComplete="on"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="auth-input"
              />
            </div>
            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="auth-input"
              />
            </div>
            {imagePreview && <img src={imagePreview} alt="Selected" style={{ width: "100px" }} />}
            <button className="auth-btn">{!loading ? "Signup" : "Signing in..."}</button>
          </form>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line react/prop-types
function Auth({ type }) {
  const navigate = useNavigate();
  return type === "login" ? <LoginForm navigate={navigate} /> : <SignupForm navigate={navigate} />;
}

export default Auth;
