import { useContext } from "react";
import { AppContext } from "../App";

export function useBackgroundService() {
  return useContext(AppContext).backgroundService;
}
