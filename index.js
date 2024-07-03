const express = require('express');
const app = express();

app.use(express.json());
app.use(middleware);
app.use(logger);

let courses = [
    {id: 1, name: "java"},
    {id: 2, name: "javascript"},
    {id: 3, name: "python"},
];

app.get('/courses', (req, res) => {
    res.json(courses);
})
app.post('/courses', (req , res) => {
    console.log(req.body);
    let singleCourse = {
        id:courses.length + 1,
        name: req.body.name
    }
    courses.push(singleCourse)
    res.send(courses)
})

app.put('/course/:id' , (req , res) => {
    try{
        let singleCourse = courses.find((course) => {
            return course.id === +req.params.id
        })

        if (!singleCourse) {
            res.status(404).send('course does not exist');
        }

        singleCourse.name = req.body.name;
        res.send(courses);
    }catch (err) {
        res.status(500).send(err);
    }
})

function middleware(req , res, next) {
    console.log("called");
    next();
}

function logger(req , res , next) {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();
    console.log(method , ip , hostname , date);
    next();
}
app.listen(3001, () =>{
    console.log('server started')
})