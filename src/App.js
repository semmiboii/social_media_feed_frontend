import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/root";
import Posts from "./components/posts";
import PostForm from "./components/post-form";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./components/sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "/post/new",
        element: <PostForm />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp mode="signup" />,
  },
  {
    path: "/login",
    element: <SignUp mode="login" />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
