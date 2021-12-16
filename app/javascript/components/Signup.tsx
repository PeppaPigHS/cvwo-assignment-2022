import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LightningBoltIcon } from "@heroicons/react/solid";

import { getCSRFToken } from "../utils/csrfToken";

import { useUser } from "./UserContext";
import PageLayout from "./PageLayout";

const Signup = () => {
  const { user, userDispatch } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = getCSRFToken();
    const postUserDetails = async () => {
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });
      const data = await response.json();
      if (data.status && data.status === 201) {
        userDispatch({
          type: "RECEIVE_USER",
          payload: data.user,
        });
        userDispatch({
          type: "LOADING_DONE",
        });

        navigate("/", { replace: true });
      } else {
        setErrors(data.errors);
      }
      userDispatch({
        type: "LOADING_DONE",
      });
    };
    userDispatch({
      type: "LOADING_START",
    });
    postUserDetails();
  };

  useEffect(() => {
    if (password !== passwordConfirmation) {
      setErrors(["Password confirmation doesn't match Password"]);
    } else {
      setErrors([]);
    }
  }, [password, passwordConfirmation]);

  useEffect(() => {
    if (user.user !== null) {
      navigate("/", { replace: true });
    }
  }, [user.user]);

  return (
    <PageLayout>
      <div className="min-h-full flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 mx-4 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-t-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User name
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value);
                    }}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {errors.length !== 0 ? (
                <div className="relative">
                  <span className="text-sm bg-white text-red-500">
                    {errors[0]}
                  </span>
                </div>
              ) : (
                <React.Fragment />
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </button>
              </div>

              <div className="flex items-center gap-1">
                <LightningBoltIcon className="text-gray-500 h-3 w-3 inline-flex" />
                <p className="text-xs text-gray-500">
                  Powered by{" "}
                  <a
                    className="font-medium text-gray-700 hover:underline"
                    href="https://github.com/bcrypt-ruby/bcrypt-ruby"
                    target="_blank"
                  >
                    bcrypt-ruby
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 py-6 px-4 shadow border-t-2 border-gray-200 sm:rounded-b-lg sm:px-10">
            <p className="text-xs text-gray-500">
              Make sure to remember your username and password as there is no
              way to recover them.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup;
