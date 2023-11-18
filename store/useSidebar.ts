import { create } from 'zustand';

interface ISidebarStore {
    isExpanded: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    isExpanded: false,

    toggleSidebar: () => {
        set((state) => ({ isExpanded: !state.isExpanded }));
    },
}));
