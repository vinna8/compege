const {Router} = require('express');
const config = require('config');
const File = require('../models/File');
const Topic = require('../models/Topic');
const router = Router();
const fs = require('fs');

// /api/files/upload
router.post(
    '/upload', 
    async (req, res) => {
        try {
            const file = req.files.file;
            const idTopic = req.query.id;

            const type = file.name.split('.').pop();
            const dbFile = new File({name: file.name, type});
            await dbFile.save();
            
            await Topic.findOneAndUpdate({_id: idTopic}, {$set: {file: dbFile._id.toString()}});

            const path = config.get('filePath') + '\\' + file.name;

            if (fs.existsSync(path)) {
                return res.status(400).json({ message: 'Файл с таким именем существует' })
            }
            file.mv(path)
            
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при загрузке файла' })
        }
})

// /api/files/download 
router.get(
    '/download',
    async (req, res) => {
        try {
            const file = await File.findOne({_id: req.query.id});
            const path = config.get('filePath') + '\\' + file.name;

            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({ message: 'Ошибка при скачивании файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при скачивании файла' })
        }
})

// /api/files/delete 
router.post(
    '/delete',
    async (req, res) => {
        try {
            const file = await File.findOne({_id: req.query.idFile});

            await File.deleteOne({_id: file._id});
            await Topic.findOneAndUpdate({_id: req.query.idTopic}, {$unset: {file: file._id}});
            
            const path = config.get('filePath') + '\\' + file.name;

            if (fs.existsSync(path)) {
                return fs.unlinkSync(path);
            }
            return res.status(400).json({ message: 'Ошибка при удалении файла' })
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Ошибка при удалении файла' })
        }
})


module.exports = router;