"use client";

import { useAppStore, AppRole } from '@/store/useAppStore';

export function RoleSwitcher() {
  const { role, setRole } = useAppStore();

  return (
    <div className="flex items-center gap-2 mr-2">
      <span className="text-sm font-medium text-foreground/60 hidden sm:inline-block">Role:</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as AppRole)}
        className="text-sm bg-transparent border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 cursor-pointer"
      >
        <option className="bg-card text-foreground" value="VIEWER">Viewer</option>
        <option className="bg-card text-foreground" value="ADMIN">Admin</option>
      </select>
    </div>
  );
}
