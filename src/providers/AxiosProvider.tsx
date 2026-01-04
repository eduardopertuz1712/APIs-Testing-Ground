"use client";

import axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

const AxiosContext = createContext<AxiosInstance | null>(null);

export function AxiosProvider({ children }: { children: React.ReactNode }) {
  const instance = axios.create({
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <AxiosContext.Provider value={instance}>
      {children}
    </AxiosContext.Provider>
  );
}

export function useAxios() {
  const context = useContext(AxiosContext);

  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }

  return context;
}
