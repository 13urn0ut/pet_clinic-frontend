import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallbackToast from "./components/ErrorFallbackToast";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const UserForm = lazy(() => import("./components/UserForm"));
const Appointments = lazy(() => import("./components/Appointments"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const App = () => {
  return (
    <>
      <Toaster />
      <ErrorBoundary FallbackComponent={ErrorFallbackToast}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <div className="app-container">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<h1>Welcome</h1>} />
                <Route path="/login" element={<UserForm action="login" />} />
                <Route path="/signup" element={<UserForm action="signup" />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/appointments" element={<Appointments />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default App;
