import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Registration from './Pages/Registration'; 
import Home from './Pages/Home'


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/registration", element: <Registration /> },
], {
  future: {
    v7_startTransition: true, 
    v7_relativeSplatPath: true, 
  },
});

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
