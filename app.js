const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const corsMiddleware = require('./middleware/cors.middleware');
const fileUpload = require('express-fileupload');

const app = express();

app.use(corsMiddleware);
app.use(fileUpload({}));
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/topic', require('./routes/topic.routes'));
app.use('/api/files', require('./routes/file.routes'));
app.use('/api/task', require('./routes/task.routes'));
app.use('/api/group', require('./routes/group.routes'));
app.use('/api/variant', require('./routes/variant.routes'));
app.use('/api/note', require('./routes/note.routes'));

const PORT = config.get('port') || 3001;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        app.listen(PORT, () => console.log(`${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();