import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { DungeonPage } from "@/pages/DungeonPage";
import { HomePage } from "@/pages/HomePage";
import { RewardsPage } from "@/pages/RewardsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="dungeon/:slug" element={<DungeonPage />} />
      </Route>
    </Routes>
  );
}
