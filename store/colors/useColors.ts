import { create, StateCreator } from 'zustand';
import { Color } from 'react-color';
import { devtools } from 'zustand/middleware';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

type IAddFunc = (color: any) => any;

const createFakeColors = () => {
    return Array.from({ length: 50 }).map(() => ({
        hex: faker.internet.color(),
        name: faker.internet.color(),
    }));
};

export interface IColor {
    name: string;
    hex: Color;
}

interface IColorsStore {
    colors: IColor[];
    isLoading: boolean;
    error: string | null;

    fetchColors: () => void;
    addColor: (color: IColor) => void;
    deleteColor: (color: IColor) => void;
    editColor: (color: IColor) => void;
}

export const useColorsStore = create<IColorsStore>(
    devtools(
        (set) => ({
            isLoading: false,
            error: null,
            colors: [],

            fetchColors: async () => {
                try {
                    const response = await axios.get(API_URLS.getColors);
                    if (response.status !== 200) throw new Error('Error while fetching colors');
                    const { data } = response.data;

                    set(() => ({ colors: data }), false, 'Colors/fetchColors');
                } catch (error) {
                    toast.error('Error while fetching colors');
                }
            },

            addColor: (color) => {
                set((state) => ({ colors: [...state.colors, color] }));
            },

            deleteColor: () => {},
            editColor: () => {},
        }),
        { name: 'Colors Store' }
    ) as StateCreator<IColorsStore>
);
