import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // TRY SIGN IN
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      if (err.code === "auth/user-not-found") {
        // SIGN UP FLOW
        if (!name.trim()) {
          setError("Please enter your name to create an account");
          return;
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // SAVE USER PROFILE IN FIRESTORE
        await setDoc(doc(db, "users", res.user.uid), {
          name: name.trim(),
          email,
          createdAt: new Date(),
        });

        navigate("/dashboard", { replace: true });

      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="glass p-8 rounded-2xl w-[380px]"
      >
        <h1 className="text-2xl font-bold text-white mb-6">
          Sign In / Sign Up
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3">
            {error}
          </p>
        )}

        {/* NAME (ONLY REQUIRED FOR FIRST SIGN UP) */}
        <input
          type="text"
          placeholder="Your Name (for first time signup)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-transparent text-white border border-white/30"
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-transparent text-white border border-white/30"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-transparent text-white border border-white/30"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-semibold"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
