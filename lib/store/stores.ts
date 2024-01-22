import { create } from "zustand";

interface storesProps {
    storeId: string
    setStoreId: (storeId: string) => void
}


export const useStores = create<storesProps>((set) => ({
    storeId: "",
    setStoreId: (storeId) => set({ storeId }),
}))


