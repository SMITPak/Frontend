import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Tabs,
} from "flowbite-react";
import { useState } from "react";
import apiRequest from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/authSlice";
import { openModal } from '../../Redux/countCart'

export function AuthModal() {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.count)
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  // Sign In state
  const [username, setUserName] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up state
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    apiRequest({
      method: "post",
      endpoint: `/users/login`,
      setLoading,
      data: {
        email: signInEmail,
        password: signInPassword,
      },
      onSuccess: (data) => {
        const {
          accessToken,
          refreshToken,
          expiryAccessToken,
          expiryRefreshToken,
          user,
        } = data;
        dispatch(
          setCredentials({
            accessToken,
            refreshToken,
            expiryAccessToken,
            expiryRefreshToken,
            user,
          })
        );
        dispatch(openModal(false));
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    apiRequest({
      method: "post",
      endpoint: `/users`,
      setLoading,
      data: {
        name: username,
        email: signUpEmail,
        password: signUpPassword,
      },
      onSuccess: (data) => {
        console.log(data);
        dispatch(openModal(false));
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <>
      <Button onClick={() => dispatch(openModal(true))}>Register</Button>
      <Modal
        className="!w-full"
        show={open}
        onClose={() => dispatch(openModal(false))}
      >
        <ModalHeader>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("signin")}
              className={`px-3 py-1 rounded ${
                activeTab === "signin"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`px-3 py-1 rounded ${
                activeTab === "signup"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          {activeTab === "signin" ? (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <TextInput
                  id="signin-email"
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <TextInput
                  id="signin-password"
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading} type="submit">
                {loading ? "Wait" : "sign up"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="signup-name">Username</Label>
                <TextInput
                  id="signup-name"
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="signup-email">Email</Label>
                <TextInput
                  id="signup-email"
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="signup-password">Password</Label>
                <TextInput
                  id="signup-password"
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <TextInput
                  id="signup-confirm"
                  type="password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading} type="submit">
                {loading ? `Wait` : "sign up"}{" "}
              </Button>
            </form>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}
