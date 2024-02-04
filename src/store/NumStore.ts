import { create } from 'zustand';

// Define the type for the state
type NumState = {
  selectedNum: number;
  setSelectedNum: (num: number) => void;
};

// Create a store with the defined state type
export const useNumStore = create<NumState>((set) => ({
  selectedNum: 0,
  setSelectedNum: (num) => set({ selectedNum: num}),
}));