let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

const { faker } = require('@faker-js/faker');

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/VOnline');

let userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    avatar: String,
    firstName: String,
    lastName: String,
    info: String,
    phone: String,
    sex: String,
    birthday: Date,
    friends: [
        {
            type: mongoose.ObjectId,
            ref: 'User'
        }
    ]
});
let User = mongoose.model('User', userSchema);


let postSchema = new mongoose.Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    content: String
}, {
    timestamps: true
})
let Post = mongoose.model('post', postSchema);

let users = [];

for (let i = 0; i < 30; i++){
    let sex = faker.name.sex();
    users.push({
        username: faker.internet.userName(),
        avatar: faker.image.people(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        info: faker.lorem.text(7),
        birthday: faker.date.past(),

    });
}


app.get('/profile', async function (req, res) {
    let me = await User.findOne({_id: CURRENT_USER});
    res.redirect(`/user?username=${me.username}`);
});