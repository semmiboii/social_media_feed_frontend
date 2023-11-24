import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/root';
import Posts from './components/posts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [{
      index: true,
      element: <Posts/>
    }]
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
