import { RouterProvider } from "react-router/dom";
import { router } from "./routes.tsx";
import { Toaster } from "sonner";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { NavDrawerProvider } from "./context/NavDrawerProvider";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Provider store={store}>
        <NavDrawerProvider>
          <RouterProvider router={router} />
        </NavDrawerProvider>
      </Provider>
    </>
  );
};

export default App;
