import { ADD_NOTE, DELETE_NOTE, SET_ACTIVE_NOTE, UPDATE_NOTE, SEARCH_NOTE } from "./action";
export interface INotes {
    id: string;
    title: string;
    content: string;
    lastUpdated: Date;
    visible: boolean;
}

export interface IAppState {
    notes: INotes[];
    activeNoteId: string;
}

let existingNotes = window.localStorage.getItem('notes') as any;
const id = Math.random().toString();
if (existingNotes) {
    existingNotes = JSON.parse(existingNotes);
    if (!existingNotes.notes.length) {
        existingNotes = {
            notes: [{
                id,
                title: '',
                content: '',
                lastUpdated: new Date(),
                visible: true
            }],
            activeNoteId: id
        };
    }
} else {
    existingNotes = {
        notes: [{
            id,
            title: '',
            content: '',
            lastUpdated: new Date(),
            visible: true
        }],
        activeNoteId: id
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
                    visible: true,
                    lastUpdated: new Date()
                }].concat(prevState.notes)
            }
        case DELETE_NOTE:
            const newNodes = prevState.notes.filter(note => note.id !== prevState.activeNoteId)
            const newState = {
                ...prevState,
                notes: newNodes,
                activeNoteId: newNodes[0] ? newNodes[0].id : null
            }
            window.localStorage.setItem('notes', JSON.stringify(newState));
            return newState;
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
            {
                let newState = {
                    ...prevState,
                    activeNoteId: action.id
                };
                window.localStorage.setItem('notes', JSON.stringify(newState));
                return newState;
            }
        case SEARCH_NOTE:
            const { searchText } = action;
            let notes: INotes[] = [];
            if (!searchText) {
                notes = prevState.notes.map(note => ({
                    ...note,
                    visible: true
                }));
            } else {
                notes = prevState.notes.map(note => ({
                    ...note,
                    visible: (
                        note.title.includes(searchText) ||
                        note.content.includes(searchText)
                    ) ? true : false
                }));
            }
            const firstNote = notes.find(note => note.visible);
            return {
                ...prevState,
                notes,
                activeNoteId: firstNote ? firstNote.id : null
            };
        default:
            return prevState;
    }
};