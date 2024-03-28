import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

interface SignInPageProps {
  onSignIn: (username: string, password: string) => void;
  error: string;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignIn(username, password);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/2 m-auto h-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-semibold mb-4">Welcome back</h1>

          <p className="mb-8  text-gray-400 font-semibold">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Error!</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block py-1 text-xl font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block py-1 text-xl font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 font-semibold text-black">
                  Remember for 30 days
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-black hover:underline"
              >
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-700"
            >
              Sign in
            </button>

            <div className="flex items-center justify-center">
              <div className="bg-gray-300 h-px flex-grow t-2 relative top-2"></div>
              <span className="flex-none uppercase px-2 text-sm text-gray-400">
                or
              </span>
              <div className="bg-gray-300 h-px flex-grow t-2 relative top-2"></div>
            </div>

            <button
              type="button"
              className="w-full py-2 px-4 bg-white rounded-lg hover:bg-green-200 flex items-center justify-center border border-gray-300 font-semibold text-black "
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?
            <a
              href="#"
              className="font-semibold text-black hover:underline ml-2"
            >
              Sign up for free
            </a>
          </p>
        </div>
      </div>

      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/office.webp")' }}
      >
        <div className="flex items-center h-full p-12">
          <div className="max-w-xl">
            <blockquote>
              <p className="text-2xl font-medium text-white">
                "We've been using Untitled to kick start every new project and
                can't imagine working without it."
              </p>
              <footer className="mt-4">
                <p className="font-bold text-white">Andi Lane</p>
                <p className="text-white">Founder, Catalog</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
