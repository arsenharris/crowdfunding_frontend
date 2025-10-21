import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import NavBar from "./components/NavBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FundraiserForm from "./pages/FundraiserForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  // These are the three routes!
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/api-token-auth", element: <RegisterForm /> },
      { path: "/fundraiser/:id", element: <FundraiserPage /> },
      { path: "/fundraisers", element: <FundraiserForm /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Here we wrap our app in the router provider so the pages render */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

function App() {
  return <div className="bg-blue-500 text-white p-4">Tailwind works!</div>;
}

export default App;

