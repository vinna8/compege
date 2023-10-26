import * as axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {},
});

export const authAPI = {
    async registration(login, email, password, lastName, firstName, patronymic) {
        return await instance.post(`/api/auth/register`, { login, email, password, lastName, firstName, patronymic });
    },

    async login(email, password) {
        return await instance.post(`/api/auth/login`, { email, password })
    },

    async auth() {
        return await instance.get(`/api/auth/auth`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    },

    async updateStat(login, statistic) {
        return await instance.post(`/api/auth/updateStat`, { login, statistic })
    },

    async allUsers() {
        return await instance.get('/api/auth/users')
    }
}

export const taskAPI = {
    async topics() {
        return await instance.get('/api/topic/topics')
    },

    async download(file) {
        return await instance.get(`/api/files/download?id=${file.file}`, 
            {
                responseType: 'blob',
            })
    },

    async upload(file, idTopic) {
        return await instance.post(`/api/files/upload?id=${idTopic}`, file)
    },

    async delete(file, idTopic) {
        return await instance.post(`/api/files/delete?idFile=${file}&idTopic=${idTopic}`)
    },

    async tasks() {
        return await instance.get('/api/task/tasks')
    },

    async addTask(task) {
        return await instance.post('/api/task/add', { task })
    },

    async specificTasks(number) {
        return await instance.get(`/api/task/specificTasks?number=${number}`)
    },

    async deleteTask(taskId) {
        return await instance.post(`/api/task/delete?idTask=${taskId}`)
    },

    async addVariant(variant) {
        return await instance.post('/api/variant/addVariant', { variant })
    },

    async variants(teacher) {
        return await instance.get(`/api/variant/variants?idTeacher=${teacher}`)
    },

    async deleteVariant(variant) {
        return await instance.post(`/api/variant/deleteVariant?idVariant=${variant}`)
    },

    async assignment(variant, teacher, students) {
        return await instance.post(`/api/variant/assignment`, { variant, teacher, students })
    },

    async assignmentForGroup(variant, teacher, groups) {
        return await instance.post(`/api/variant/assignmentForGroup`, { variant, teacher, groups })
    },
}

export const groupAPI = {
    async addGroup(group) {
        return await instance.post('/api/group/addGroup', { group })
    },

    async groups(idTeacher) {
        return await instance.get(`/api/group/getGroup?id=${idTeacher}`)
    },

    async deleteStudent(group, student) {
        return await instance.post(`/api/group/deleteStudent`, { group, student })
    },

    async addStudent(group, student) {
        return await instance.post(`/api/group/addStudent`, { group, student })
    },

    async getStudentStat(student) {
        return await instance.get(`/api/group/studentStat?id=${student}`, )
    }
}

export const noteAPI = {
    async addNote(note) {
        return await instance.post('/api/note/add', { note })
    },

    async notes(teacher) {
        return await instance.get(`/api/note/notes?id=${teacher}`)
    },

    async delete(note) {
        return await instance.post(`/api/note/delete?id=${note}`)
    },
}