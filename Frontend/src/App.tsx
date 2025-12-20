import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import SharedBrainPage from "./pages/SharedBrainPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:shareLink" element={<SharedBrainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
