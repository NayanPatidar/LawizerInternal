"use client";

import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function MobileMenuButton({
  menuOpen,
  setMenuOpen,
}: MobileMenuButtonProps) {
  return (
    <button
      className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
