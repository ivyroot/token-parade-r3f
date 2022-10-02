import create from 'zustand'

export interface ParadeState {
    addressInput: string
    setAddressInput: (val: string) => void
    addressValue: null | string
    setAddressValue: (val: string) => void
    addressHex: null | string
    setAddressHex: (val: string) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
    displayInput: boolean
    setDisplayInput: (val: boolean) => void
}

export const UseParadeState = create<ParadeState>((set) => ({
    addressInput: '',
    setAddressInput: (val: string) => set((state) => ({ addressInput: val })),
    addressValue: null,
    setAddressValue: (val: string) => set((state) => ({ addressValue: val })),
    addressHex: null,
    setAddressHex: (val: string) => set((state) => ({ addressHex: val })),
    isLoading: false,
    setIsLoading: (val: boolean) => set((state) => ({ isLoading: val })),
    displayInput: true,
    setDisplayInput: (val: boolean) => set((state) => ({ displayInput: val })),
}))
