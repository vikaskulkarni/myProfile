import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getKeys } from './keys';
import Profile from './entities/profile';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

app.use(express.static('../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.connect(getKeys('dbUri'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/', (req, res) => {
    res.json({ message: 'Testing... World!' });
});
router.get('/profileDetails', (req, res) => {
    Profile.find((err, profiles) => {
        if (err) return res.json(500, { success: false, error: err });
        return res.json({ success: true, data: profiles });
    })
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));