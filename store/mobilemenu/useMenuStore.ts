import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IMobileMenu {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useMobileMenuStore = create<IMobileMenu>()(
    devtools(
        (set) => ({
            isOpen: true,

            open: () => {
                set({ isOpen: true }, false, 'mobilemenu/open');
            },

            close: () => {
                set({ isOpen: false }, false, 'mobilemenu/close');
            },
        }),
        { name: 'mobilemenu' }
    )
);
