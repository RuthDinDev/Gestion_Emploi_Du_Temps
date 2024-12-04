import { create } from "zustand";


// Handle the Sidebar is shown or not
export const useShowSidebar = create((set) => ({
    isShown: true,
    setUseShowSidebar: () => set((state) => ({ isShown: !state.isShown })),
    //   removeAllBears: () => set({ bears: 0 }),
  }));