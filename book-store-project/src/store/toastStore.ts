import create from 'zustand';

export type ToastType = 'info' | 'error';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<ToastStoreState>((set) => ({
  toasts: [],
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
  },
  removeToast: (id: number) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id!== id),
    }));
  },
}));

export default useToastStore;