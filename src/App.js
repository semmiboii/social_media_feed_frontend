import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import RootLayout, { loader as rootLoader } from "./pages/Root";
import Feed, { loader as feedLoader } from "./pages/Feed";
import UserPage, { loader as userLoader } from "./pages/User";
import CreatePost, { loader as createPostLoader } from "./pages/Create";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Feed />,
        loader: feedLoader,
      },
      {
        path: "/post/new",
        element: <CreatePost />,
        loader: createPostLoader,
      },
      {
        path: "/user",
        element: <UserPage />,
        loader: userLoader,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup mode="signup" />,
  },
  {
    path: "/login",
    element: <Signup mode="login" />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-center" />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
