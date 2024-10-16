// src/stores/modal-store.ts
import { createStore } from "zustand/vanilla";

export enum ModalTypes {
  Signout = "signout",
}

export type ModalState = {
  isOpen: boolean | null | undefined;
  type: ModalTypes | null | undefined;
  data: { [key: string]: any } | null | undefined;
};

export type ModalActions = {
  onOpen: (type: ModalTypes, data?: { [key: string]: any }) => void;
  onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const initModalStore = (): ModalState => {
  return {
    isOpen: false,
    type: null,
    data: null,
  };
};

export const defaultInitState: ModalState = {
  isOpen: false,
  type: null,
  data: null,
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,
    onOpen: (type: ModalTypes, data?: { [key: string]: any }) => {
      set({ type, isOpen: true, data });
    },
    onClose: () => {
      set({ type: null, isOpen: false, data: null });
    },
  }));
};
