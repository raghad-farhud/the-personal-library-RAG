import type { ReactNode } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { LandingPage } from "@/pages/LandingPage";
import { LibraryPage } from "@/pages/LibraryPage";
import { UploadPage } from "@/pages/UploadPage";
import { AskPage } from "@/pages/AskPage";
import { LoginPage } from "@/pages/LoginPage";
import { DemoLibraryPage } from "@/pages/DemoLibraryPage";
import { DemoUploadPage } from "@/pages/DemoUploadPage";
import { DemoAskPage } from "@/pages/DemoAskPage";

function AuthGate({
  page,
  demo,
}: {
  page: ReactNode;
  demo: ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{page}</> : <>{demo}</>;
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<AppShell />}>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/library"
              element={
                <AuthGate
                  page={<LibraryPage />}
                  demo={<DemoLibraryPage />}
                />
              }
            />
            <Route
              path="/upload"
              element={
                <AuthGate
                  page={<UploadPage />}
                  demo={<DemoUploadPage />}
                />
              }
            />
            <Route
              path="/ask"
              element={
                <AuthGate
                  page={<AskPage />}
                  demo={<DemoAskPage />}
                />
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}
