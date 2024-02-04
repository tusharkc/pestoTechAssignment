import React, { useState } from "react";
import {
  useLogInMutation,
  useSignUpMutation,
} from "../../../services/appUser.services";
import { useNavigate } from "react-router-dom";
import { appRoutesConstants } from "../../../constants/appRoutes";

const LoginOrSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [login] = useLogInMutation();
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const toggleFormType = () => {
    setIsSignUp(!isSignUp);
  };

  const handleFormSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formValues.email && formValues.password) {
      if (!emailRegex.test(formValues.email)) {
        alert("Please enter a valid email address");
        return;
      }

      try {
        if (!isSignUp) {
          await login(formValues);
          navigate(appRoutesConstants.TODOS);
        } else {
          await signUp(formValues);
          navigate(appRoutesConstants.TODOS);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      alert("please provide both fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={toggleFormType}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
          </button>
        </div>
        <form
          className="mt-8 space-y-6"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={formValues.email}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  });
                }}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    password: e.target.value,
                  });
                }}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginOrSignUp;
