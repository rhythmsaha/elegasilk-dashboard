import { create } from 'zustand';

interface ISidebarStore {
    isExpanded: boolean;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    isExpanded: true,

    toggleSidebar: () => {
        set((state) => ({ isExpanded: !state.isExpanded }));
    },
}));
