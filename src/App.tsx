import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { LandingPage } from "@/pages/LandingPage";
import { UploadPage } from "@/pages/UploadPage";
import { AskPage } from "@/pages/AskPage";
import { SettingsPage } from "@/pages/SettingsPage";

export default function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
