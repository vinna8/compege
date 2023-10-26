import  { SET_USER_DATA, SET_ERROR_AUTH, SET_ERROR_REG, CLEAR_USER_DATA, TOGGLE_IS_FETCHING, DISABLED,
    GET_TOPICS, GET_TASKS, GET_RESULT, GET_SCORE, RANDOM_TASKS, SET_STATISTIC_DATA,
    UPDATE_STATISTIC, GET_ALL_USERS, GET_GROUPS, GET_STUDENT_STATISTIC, GET_SPECIFIC_TASKS, SET_ERROR_DELETE_TASK, DELETE_TASK, CLEAR_TASKS, GET_ALL_VARIANTS, DELETE_VARIANT, GET_ALL_NOTES} from "./types";

export const setAuthUserData = (user) => {
    return {
        type: SET_USER_DATA,
        data: {user}
    };
}

export const setStatisticData = (statistic) => {
    return {
        type: SET_STATISTIC_DATA,
        data: {statistic}
    };
}

export const setErrorAuth = (messageErrorAuth) => {
    return {
        type: SET_ERROR_AUTH,
        data: {messageErrorAuth}
    };
}

export const setErrorReg = (messageErrorReg) => {
    return {
        type: SET_ERROR_REG,
        data: {messageErrorReg}
    };
}

export const clearAuthUserData = () => {
    return {
        type: CLEAR_USER_DATA,
    };
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
}

export const isDisabled = (isDisabled) => {
    return {
        type: DISABLED,
        isDisabled
    };
}

export const getTopics = (topics) => {
    return {
        type: GET_TOPICS,
        data: {topics}
    };
}

export const getTasks = (tasks) => {
    return {
        type: GET_TASKS,
        data: {tasks}
    }
}

export const resultsData = (results) => {
    return {
        type: GET_RESULT,
        data: {results}
    }
}

export const scoreData = (score) => {
    return {
        type: GET_SCORE,
        data: {score}
    }
}

export const generatedTasks = (randomTasks) => {
    return {
        type: RANDOM_TASKS,
        data: {randomTasks}
    }
}

export const updateStat = (statistic) => {
    return {
        type: UPDATE_STATISTIC,
        data: {statistic}
    }
}

export const getUsers = (allUsers) => {
    return {
        type: GET_ALL_USERS,
        data: {allUsers}
    }
}

export const getAllGroups = (groups) => {
    return {
        type: GET_GROUPS,
        data: {groups}
    };
}

export const studentStat = (statisticStudent) => {
    return {
        type: GET_STUDENT_STATISTIC,
        data: {statisticStudent}
    };
}

export const specificNumTasks = (specificTasks) => {
    return {
        type: GET_SPECIFIC_TASKS,
        data: {specificTasks}
    };
}

export const setErrorDeleteTask = (messageErrorDelTask) => {
    return {
        type: SET_ERROR_DELETE_TASK,
        data: {messageErrorDelTask}
    };
}

export const deleteTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId
    };
}

export const clearTasks = () => {
    return { 
        type: CLEAR_TASKS
    }
}

export const getAllVariants = (variants) => {
    return {
        type: GET_ALL_VARIANTS,
        data: {variants}
    }
}

export const deleteVariant = (variantId) => {
    return {
        type: DELETE_VARIANT,
        variantId
    };
}

export const getAllNotes = (notes) => {
    return {
        type: GET_ALL_NOTES,
        data: {notes}
    }
}