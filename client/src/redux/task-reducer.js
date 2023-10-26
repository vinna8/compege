import { taskAPI } from "../api/api";
import { getTopics, getTasks, toggleIsFetching, resultsData, scoreData, generatedTasks, isDisabled, specificNumTasks, setErrorDeleteTask, deleteTask, clearTasks, getAllVariants, deleteVariant } from "./actions";
import  { GET_TOPICS, GET_TASKS, GET_RESULT, GET_SCORE, RANDOM_TASKS, DISABLED, TOGGLE_IS_FETCHING, GET_SPECIFIC_TASKS, SET_ERROR_DELETE_TASK, DELETE_TASK, CLEAR_TASKS, GET_ALL_VARIANTS, DELETE_VARIANT } from "./types";

let initialState = {
    topics: [],
    tasks: [],
    randomTasks: [],
    results: [],
    score: 0,
    specificTasks: [],
    variants: [],
    messageErrorDelTask: null
    /*isFetching: false,
    isDisabled: false,*/
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOPICS:
            return {
                ...state,
                ...action.data,
            }
        case GET_TASKS:
            return {
                ...state,
                ...action.data
            }
        case GET_RESULT:
            return {
                ...state,
                ...action.data,
            }
        case GET_SCORE:
            return {
                ...state,
                ...action.data,
            }
        case RANDOM_TASKS:
            return {
                ...state,
                ...action.data,
            }
        case GET_SPECIFIC_TASKS:
            return {
                ...state,
                ...action.data,
            }
        case SET_ERROR_DELETE_TASK:
            return {
                ...state,
                ...action.data,
            }
        case DELETE_TASK:
            return {
                ...state,
                specificTasks: state.specificTasks.filter(specificTask => specificTask._id !== action.taskId)
            }
        case CLEAR_TASKS:
            return {
                ...state,
                specificTasks: []
            }
        case GET_ALL_VARIANTS:
            return {
                ...state,
                ...action.data,
            }
        case DELETE_VARIANT:
            return {
                ...state,
                variant: state.variants.filter(variants => variants._id !== action.variantId)
            }
        /*case TOGGLE_IS_FETCHING:
                return {
                    ...state, 
                    isFetching: action.isFetching
                }
        case DISABLED:
                return {
                    ...state, 
                    isDisabled: action.isDisabled
                }*/
        default:
            return state;
    }
}

export const topics = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        taskAPI.topics()
        .then(response => {
            dispatch(toggleIsFetching(false));
            let topics = response.data;
            dispatch(getTopics(topics));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

//добавить disable fetching
export const addTask = (task) => {
    return (dispatch) => {
        taskAPI.addTask(task)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const download = (file) => {
    return (dispatch) => {
        taskAPI.download(file)
        .then(response => {
            const blob = response.data;
            console.log(response.data)
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `ege${file.number}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(error => {
            console.log(error);
        })
    }
}

//добавить fetching
export const upload = (file, idTopic) => {
    return (dispatch) => {
        const formData = new FormData();
        formData.append('file', file)
        taskAPI.upload(formData, idTopic)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

//добавить fetching
export const deleteFile = (file, idTopic) => {
    return (dispatch) => {
        console.log(file)
        taskAPI.delete(file, idTopic)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getAllTasks = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        taskAPI.tasks()
        .then(response => {
            dispatch(toggleIsFetching(false));
            let tasks = response.data;
            dispatch(getTasks(tasks));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const randomTasks = (randomTasks) => {
    return (dispatch) => {
        dispatch(generatedTasks(randomTasks));
    }
}

export const getResults = (results, score) => {
    return (dispatch) => {
        dispatch(resultsData(results));
        dispatch(scoreData(score));
    }
}

export const getSpecificTasks = (number) => {
    return (dispatch) => {
        taskAPI.specificTasks(number)
        .then(response => {
            let specificTasks = response.data;
            dispatch(specificNumTasks(specificTasks))
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const deleteSpecificTask = (taskId) => {
    return (dispatch) => {
        taskAPI.deleteTask(taskId)
        .then(response => {
            console.log(response.data);
            dispatch(deleteTask(taskId));
        })
        .catch(error => {
            console.log(error);
            let messageErrorDelTask = error.response.data.message;
            dispatch(setErrorDeleteTask(messageErrorDelTask));
        })
    }
}

export const addNewVariant = (variant) => {
    return (dispatch) => {
        dispatch(clearTasks());
        taskAPI.addVariant(variant)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getVariants = (idTeacher) => {
    return (dispatch) => {
        taskAPI.variants(idTeacher)
        .then(response => {
            let variants = response.data;
            dispatch(getAllVariants(variants))
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const deleteSpecificVariant = (variant) => {
    return (dispatch) => {
        taskAPI.deleteVariant(variant)
        .then(response => {
            console.log(response);
            dispatch(deleteVariant(variant));
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const assignmentVariant = (variant, teacher, students) => {
    return (dispatch) => {
        taskAPI.assignment(variant, teacher, students)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const assignmentVariantForGroup = (variant, teacher, group) => {
    return (dispatch) => {
        taskAPI.assignmentForGroup(variant, teacher, group)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export default taskReducer;