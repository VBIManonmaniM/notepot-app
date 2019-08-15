import { ADD_NOTE, DELETE_NOTE, SET_ACTIVE_NOTE } from "./action";
export interface INotes {
    id: string;
    title: string;
    content: string;
    lastUpdated: Date;
}

export interface IAppState {
    notes: INotes[];
    activeNoteId: string;
}

export const INITIAL_STATE: IAppState = {
    notes: [],
    activeNoteId: null
}

export const rootReducer = (prevState: IAppState, action): IAppState => {
    switch (action.type) {
        case ADD_NOTE:
            action.note.id = Math.random();
            return {
                ...prevState,
                notes: prevState.notes.concat(action.note)
            }
        case DELETE_NOTE:
            return {
                ...prevState,
                notes: prevState.notes.filter(note => note.id !== action.id)
            }
        case SET_ACTIVE_NOTE:
            return {
                ...prevState,
                activeNoteId: action.id
            }
        default:
            return prevState;
    }
};