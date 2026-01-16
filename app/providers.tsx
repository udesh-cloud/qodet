
"use client";

import React, { PropsWithChildren } from "react";
import { NavbarProvider } from "../contexts/NavbarContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NavbarProvider>
      {children}
    </NavbarProvider>
  );
}
