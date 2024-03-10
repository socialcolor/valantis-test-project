import { AxiosInstance } from "axios"
import { AppDispatch, State } from "./state"

export type AsyncThunkType = {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
}

export type FetchIds = {
    result: string[]
}
