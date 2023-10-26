import { noteAPI } from "../api/api";
import { getAllNotes } from "./actions";
import { GET_ALL_NOTES } from "./types";

let initialState = {
    notes: [], 
};

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_NOTES:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const addNewNote = (note) => {
    return (dispatch) => {
        noteAPI.addNote(note)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getNotes = (teacher) => {
    return (dispatch) => {
        noteAPI.notes(teacher)
        .then(response => {
            let notes = response.data;
            dispatch(getAllNotes(notes));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const deleteOneNote = (note) => {
    return (dispatch) => {
        noteAPI.delete(note)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export default noteReducer;