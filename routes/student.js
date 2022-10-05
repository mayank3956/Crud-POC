const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    console.log('reqqqqq', req.headers[''])
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      console.log('req.token', req.token, 'beaar*****', bearerToken)
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

router.post("/api/login", (req, res) => {
  // Mock user
  // In real time we will use this creds from ENV or some third party applications
//   const { userName, email } = req.body;
  const user = {
    id: 1,
    username: "Test",
    email: "test@test.comk",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "240s" }, (err, token) => {
    res.json({
      authToken: token,
      Hint:"Please paste the above token in the headers of the API that you want to hit "
    });
  });
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const Students = await Student.find();
    res.json(Students);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const StudentRecord = await Student.findById(req.params.id);
    res.json(StudentRecord);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  console.log("req", req.body);
  const studentRecord = new Student({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
    rollNo: req.body.rollNo,
  });
  console.log("studentRecord", studentRecord);
  try {
    const a1 = await studentRecord.save();
    console.log("a1", a1);
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    console.log('id', req.params.id)
    const query = { _id: req.params.id };
    const newvalues = {
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub,
        rollNo: req.body.rollNo,
      };
    const student = await Student.updateOne(query, newvalues);
    res.json(student);
  } catch (err) {
    res.send("Error");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const query = { _id: req.params.id };
  const result = await Student.deleteOne(query);
  res.send(result);
});

module.exports = router;
