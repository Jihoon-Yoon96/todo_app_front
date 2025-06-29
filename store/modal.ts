import {create} from 'zustand'

interface State{
    modals: object
}
interface Actions{
    actions: {
        addModals: (param: object)=>void
        closeModals: ()=>void
        resetState: (keys?: Array<keyof State>) => void,
        openModals: (param: any)=>void
    }
}

const initialModals: State = {
    modals: []
}
export const useModal = create<State & Actions>((set, get)=>({
    modals: [],
    actions: {
        addModals: (val)=> set((state: any)=>({modals: [...state.modals, val]})),
        closeModals: ()=> set((state: any)=>({modals: [...state.modals].pop()})),
        resetState: keys => {
            // 전체 상태 초기화
            if (!keys) {
                set(initialModals)
                return
            }
            // 일부 상태 초기화
            // keys.forEach(key => {
            //     set({ [key]: initialModals[key] })
            // })
        },
        openModals: item => {
            return new Promise(resolve => {
                item.key = Math.floor(Math.random() * 1000)
                item.close = function (result: any) {
                    resolve(result)
                    get().actions.closeModals()
                }
                get().actions.addModals(item)
            })
        }
    }
}))