import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//styles
import "./App.scss";

//pages
import Main from "./pages/Home/Main";
import LoginForm from "./pages/Login/LoginForm";
import SignUpForm from "./pages/Signup/SignUpForm";

//Layouts
import MainLayout from "./layouts/MainLayout/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path="signup" element={<SignUpForm />} />
      <Route path="login" element={<LoginForm />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
