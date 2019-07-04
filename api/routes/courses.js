const express = require("express");
const router = express.Router();
const Course = require("../models").Course; //require("../models".Course);
const User = require("../models").User;
const authenticateUser = require("./authenticate");
const Sequelize = require("sequelize"); //do I need this?

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};


router.get("/", asyncHandler( async (req, res) => { //SEND GET request to Return a list of courses (including the user that owns each course)
    const courses = await Course.findAll ({
        attributes: ["id", "title", "description", "userId"],
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName", "emailAddress"]
            }
        ]
    });
    res.json({ courses });
}));

router.get("/:id", asyncHandler( async (req, res) => { //SEND GET request to Return a list of courses (including the user that owns each course) for the provided course ID
    const coursesById = await Course.findByPk (req.params.id, {
        attributes: ["id", "title", "description", "estimatedTime", "materialsNeeded", "userId"],
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName", "emailAddress"]
            }
        ]
    });
    if (coursesById) {
        res.status(200);
        res.json({ coursesById });
    } else {
        res.status(404).json({ message: "No course found."});
    }
}));

router.post("/", authenticateUser, (req, res, next) => { //POST /api/courses 201 Creates a course
    if(!req.body.title && !req.body.description) {
        const err = new Error("Title and Description are required.");
        err.status = 400;
        next(err);
    } else if (!req.body.title) {
        const err = new Error ("Enter a Course Title");
        err.status = 400;
        next(err);
    } else if (!req.body.description) {
        const err = new Error("Enter a Course Description");
        err.status = 400;
        next(err);
    } else {
    Course.findOne({ where: { title: req.body.title}})
        .then (course => {
            if (course) {
                res.json({ error: "Ooops! This course already exists."});
            } else { // couse does not exist already... create a new course
                const newCourse = {
                    title: req.body.title,
                    description: req.body.description,
                    estimatedTime: req.body.estimatedTime,
                    materialsNeeded: req.body.materialsNeeded,
                    userId: req.currentUser.id
                };
            Course.create(newCourse)
                .then((coursesById) => {
                    const id = coursesById.id; // gets new course id for location
                    res.location(`/api/courses/${id}`).status(201).end();
                })
                .catch(err => {
                    err.status = 400;
                    next(err);
                });
            }
        })
        .catch(err => {
            err.status = 400;
            next(err);
        });
    }
});

router.put("/:id", authenticateUser, (req, res) => {  //?? need (req, res, next)?? PUT /api/courses/:id 204 - Updates a course
    Course.findOne({ where: {id: req.params.id} })
        .then(course => {
            if(!course) {
                res.status(400);
                res.json({ error: "Course not found."});
            } else if (req.body.title && req.body.description){ 
                const courseUpdated = {
                    title: req.body.title,
                    description: req.body.description,
                    estimatedTime: req.body.estimatedTime,
                    materialsNeeded: req.body.materialsNeeded,
                    userId: req.currentUser.id
                };
                course.update(courseUpdated);
            } else {
                message = "Title and Description are required";  
                res.status(400).json({message});
            };
        })
        .then(() => {
            res.status(204).end();
        })
        .catch(err => console.error(err));
});
        
router.delete("/:id", authenticateUser, (req, res) => { //DELETE /api/courses/:id 204 - Deletes a course
    Course.findOne({ where: {id: req.params.id}})
        .then(course => {
            if(!course) {
                res.status(400);
                res.json({ error: "Course not found."})
            } else {
                course.destroy();
            }
        }) 
        .then(() => {
            res.status(204).end();
        })
        .catch(err => console.error(err));
});

module.exports = router;