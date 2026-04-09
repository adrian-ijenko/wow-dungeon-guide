import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CLASS_OPTIONS, getClassById } from "@/data/specProfiles";

const CLASS_KEY = "kc.classId";
const SPEC_KEY = "kc.specId";

interface PlayerProfileContextValue {
  selectedClassId: string | null;
  selectedSpecId: string | null;
  setSelectedClassId: (classId: string) => void;
  setSelectedSpecId: (specId: string) => void;
}

const PlayerProfileContext = createContext<PlayerProfileContextValue | undefined>(undefined);

function defaultClassId(): string {
  return CLASS_OPTIONS[0]?.id ?? "";
}

function defaultSpecId(classId: string): string {
  return getClassById(classId)?.specs[0]?.id ?? "";
}

export function PlayerProfileProvider({ children }: { children: ReactNode }) {
  const [selectedClassId, setClassIdState] = useState<string | null>(null);
  const [selectedSpecId, setSpecState] = useState<string | null>(null);

  useEffect(() => {
    const storedClass = localStorage.getItem(CLASS_KEY);
    const classId = storedClass && getClassById(storedClass) ? storedClass : defaultClassId();
    const fallbackSpecId = defaultSpecId(classId);
    const storedSpec = localStorage.getItem(SPEC_KEY);
    const classHasSpec = !!getClassById(classId)?.specs.some((s) => s.id === storedSpec);

    setClassIdState(classId);
    setSpecState(classHasSpec ? storedSpec : fallbackSpecId);
  }, []);

  const value = useMemo<PlayerProfileContextValue>(
    () => ({
      selectedClassId,
      selectedSpecId,
      setSelectedClassId: (classId: string) => {
        const cls = getClassById(classId);
        if (!cls) return;
        const nextSpecId = cls.specs[0]?.id ?? "";
        setClassIdState(classId);
        setSpecState(nextSpecId);
        localStorage.setItem(CLASS_KEY, classId);
        localStorage.setItem(SPEC_KEY, nextSpecId);
      },
      setSelectedSpecId: (specId: string) => {
        if (!selectedClassId) return;
        const cls = getClassById(selectedClassId);
        if (!cls?.specs.some((s) => s.id === specId)) return;
        setSpecState(specId);
        localStorage.setItem(SPEC_KEY, specId);
      },
    }),
    [selectedClassId, selectedSpecId],
  );

  return <PlayerProfileContext.Provider value={value}>{children}</PlayerProfileContext.Provider>;
}

export function usePlayerProfile() {
  const ctx = useContext(PlayerProfileContext);
  if (!ctx) {
    throw new Error("usePlayerProfile must be used inside PlayerProfileProvider");
  }
  return ctx;
}
