import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client' ;
import './index.css' ;
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import User_Layout from './layouts/user_layout.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LanguageProvider } from './context/LanguageContext';

const router = createBrowserRouter(
       [
    {
      path: "/",
      element: <User_Layout />,
      children: [
        {
            path: "/",
            lazy: async () => 
            {
              const module = await import("./pages/product_list.jsx")
              return { Component: module.default }
            }  
        },
        {
           path: "/products/:id",
           lazy:  async () => 
            {
              const module = await import("./pages/product_details.jsx")
              return { Component: module.default }
            }  
        },
          {
            path: "/cart",
            lazy: async () =>
            {
              const module = await import("./pages/cart.jsx")
              return { Component: module.default }
            }
        },
          {
            path: "*",
            lazy: async () => {
              const module = await import("./pages/not_found.jsx")
              return { Component: module.default }
            }
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
)
