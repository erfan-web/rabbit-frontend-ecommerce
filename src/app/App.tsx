import { useEffect } from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "@/app/router";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NavDrawerProvider } from "@/shared/context/NavDrawerProvider";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchCurrentUser } from "@/features/auth/authSlice";

const AppInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileFetched = useSelector(
    (state: RootState) => state.auth.profileFetched
  );

  useEffect(() => {
    if (!profileFetched) dispatch(fetchCurrentUser());
  }, [profileFetched, dispatch]);

  return null;
};

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
        toastOptions={{ style: { fontSize: "14px" } }}
      />
      <Provider store={store}>
        <AppInit />
        <NavDrawerProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </NavDrawerProvider>
      </Provider>
    </>
  );
};

export default App;
