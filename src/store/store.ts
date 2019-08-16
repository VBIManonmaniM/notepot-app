import { ADD_NOTE, DELETE_NOTE, SET_ACTIVE_NOTE, UPDATE_NOTE } from "./action";
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

let existingNotes = window.localStorage.getItem('notes') as any;
if (existingNotes) {
    existingNotes = JSON.parse(existingNotes);
} else {
    existingNotes = {
        notes: [],
        activeNoteId: null
    };
}
export const INITIAL_STATE: IAppState = existingNotes; 

export const rootReducer = (prevState: IAppState, action): IAppState => {
    switch (action.type) {
        case ADD_NOTE:
            const id = Math.random().toString();
            return {
                ...prevState,
                activeNoteId: id,
                notes: [{
                    id,
                    title: '',
                    content: '',
                    lastUpdated: new Date()
                }].concat(prevState.notes)
            }
        case DELETE_NOTE:
            const newNodes = prevState.notes.filter(note => note.id !== prevState.activeNoteId)
            return {
                ...prevState,
                notes: newNodes,
                activeNoteId: newNodes[0] ? newNodes[0].id : null
            }
        case UPDATE_NOTE:
            let note = prevState.notes.find(note => note.id === action.note.id);
            let index = prevState.notes.indexOf(note);
            return {
                ...prevState,
                notes: [
                    ...prevState.notes.slice(0, index),
                    {
                        ...action.note,
                        lastUpdated: new Date()
                    },
                    ...prevState.notes.slice(index + 1)
                ]
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