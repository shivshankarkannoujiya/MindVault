import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import SharedBrainPage from "./pages/SharedBrainPage";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import Protected from "./AuthLayout";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster
            toastOptions={{
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              success: {
                iconTheme: {
                  primary: "#8b5cf6",
                  secondary: "white",
                },
              },
            }}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Protected authentication={false}>
                  <LandingPage />
                </Protected>
              }
            />
            <Route
              path="/signup"
              element={
                <Protected authentication={false}>
                  <Signup />
                </Protected>
              }
            />
            <Route
              path="/signin"
              element={
                <Protected authentication={false}>
                  <Signin />
                </Protected>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Protected authentication>
                  <Dashboard />
                </Protected>
              }
            />
            <Route path="/share/:shareLink" element={<SharedBrainPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
