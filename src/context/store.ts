// store.ts
import { create } from 'zustand';

interface CounterState {
    lang: string;
    changeLang: (lang: string) => void;
}

export const useCounterStore = create<CounterState>( set => ({
    lang: "es",
    changeLang: lang => set( state => ({ ...state, lang }))
}));