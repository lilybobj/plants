"use client";
import { createContext, useContext } from "react";

export const IntroActiveContext = createContext(false);

export function useIntroActive() {
  return useContext(IntroActiveContext);
}
