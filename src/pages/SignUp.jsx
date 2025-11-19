import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const signUp = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // ✅ THE FIX — This FormData MUST be declared here
      const fd = new FormData();

      fd.append("fullname", formData.fullname);
      fd.append("username", formData.username);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("avatar", formData.avatar);

      if (formData.coverImage) {
        fd.append("coverImage", formData.coverImage);
      }

      const { data } = await signUp(fd);


      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Signup failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

        {errorMsg && (
          <p className="bg-red-200 text-red-700 p-2 mb-3 rounded">{errorMsg}</p>
        )}

        {/* Fullname */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            required
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter full name"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter username"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />
        </div>

        {/* Avatar */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Avatar (Required)</label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            required
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Cover Image */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Cover Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            name="coverImage"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
