import { groupAPI } from "../api/api";
import { getAllGroups, studentStat, toggleIsFetching } from "./actions";
import { GET_GROUPS, GET_STUDENT_STATISTIC } from "./types";

let initialState = {
    groups: [], 
    statisticStudent: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                ...action.data,
            }
        case GET_STUDENT_STATISTIC:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}

export const newGroup = (group) => {
    return (dispatch) => {
        console.log(group)
        groupAPI.addGroup(group)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getGroups = (idTeacher) => {
    return (dispatch) => {
        groupAPI.groups(idTeacher)
        .then(response => {
            let groups = response.data;
            dispatch(getAllGroups(groups));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const deleteOneStudent = (group, student) => {
    return (dispatch) => {
        groupAPI.deleteStudent(group, student)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const addOneStudent = (group, student) => {
    return (dispatch) => {
        groupAPI.addStudent(group, student)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const studentStatistic = (studentId, student) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        groupAPI.getStudentStat(studentId)
        .then(response => {
            let statisticStudent = response.data.statistic;
            statisticStudent.student = student;
            dispatch(studentStat(statisticStudent));
            dispatch(toggleIsFetching(false));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export default groupReducer;