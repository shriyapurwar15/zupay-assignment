import { create } from 'zustand'

interface authTokenState{
    token : string;
    setToken : (newToken : string) => void;
}

export const useAuthTokenStore = create<authTokenState>()((set)=>({
    token : "",
    setToken : (newToken) => set(()=> ({token : newToken}))
}))