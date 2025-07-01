import { create } from 'zustand';

interface ModalItem {
    key: number;
    close: (result?: any) => void;
    component: React.ComponentType<any>;
    props?: any;
}

interface State {
    modals: ModalItem[];
}

interface Actions {
    addModal: (param: ModalItem) => void;
    closeModal: () => void;
    resetState: () => void;
    openModal: (component: React.ComponentType<any>, props?: any) => Promise<any>;
}

export const useModal = create<State & Actions>((set, get) => ({
    modals: [],
    addModal: (val) => set((state) => ({ modals: [...state.modals, val] })),
    closeModal: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
    resetState: () => set({ modals: [] }),
    openModal: (component, props = {}) => {
        return new Promise((resolve) => {
            const key = Math.floor(Math.random() * 10000);
            const close = (result?: any) => {
                resolve(result);
                get().closeModal();
            };
            get().addModal({ key, component, props: { ...props, close } });
        });
    }
}));
