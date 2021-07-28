const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codewithvetriapi-c56e3-default-rtdb.firebaseio.com",
});

const express = require("express");
const app = express();
// Creating firestore database object
const db = admin.firestore();

// instruction app to use the cors now, so that in can jump to different origin
const cors = require("cors");
app.use(cors({ origin: true }));

app.get("/helloworld", (req, res) => {
  return res.status(200).send("Hello World 😊");
});

// Courses API
// Create API
app.post("/api/courses/create", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      await db
        .collection("courses")
        .doc("/" + `${Date.now()}` + "/")
        .create({
          course_id: `${Date.now()}`,
          course_name: req.body.course_name,
          course_title: req.body.course_title,
          course_img: req.body.course_img,
          course_added_date: `${Date.now()}`,
        });
      return res
        .status(200)
        .send({ success: true, msg: "Data added successfully" });
    } catch (error) {
      console.log(error);
      res.send({ error: true, msg: error });
    }
  })();
});

//Reade a specific course base on id
app.get("/api/courses/read/:course_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("courses").doc(req.params.course_id);
      let course = await document.get();
      let courseData = course.data();
      return res.status(200).send({ success: true, data: courseData });
    } catch (error) {
      console.log(error);
      res.send({ error: true, msg: error });
    }
  })();
});

// Read all courses
app.get("/api/courses", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      let query = db.collection("courses");
      let response = [];

      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs; // the result of the query

        for (let doc of docs) {
          const selectedItem = {
            course_id: doc.data().course_id,
            course_name: doc.data().course_name,
            course_title: doc.data().course_title,
            course_img: doc.data().course_img,
            course_added_date: doc.data().course_added_date,
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value otherwise we could get an exceptions
      });
      return res.status(200).send({ success: true, data: response }); //return response at async function too
    } catch (error) {
      console.log(error);
      res.send({ error: true, msg: error });
    }
  })();
});

// Update courses
app.put("/api/courses/update/:course_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("courses").doc(req.params.course_id);
      let course = await document.get();
      let courseData = course.data();
      let course_name, course_title, course_img;
      if (req.body.course_name) {
        course_name = req.body.course_name;
      } else {
        course_name = courseData.course_name;
      }

      if (req.body.course_title) {
        course_title = req.body.course_title;
      } else {
        course_title = courseData.course_title;
      }

      if (req.body.course_img) {
        course_img = req.body.course_img;
      } else {
        course_img = courseData.course_img;
      }

      await document.update({
        course_name: course_name,
        course_title: course_title,
        course_img: course_img,
      });

      return res
        .status(200)
        .send({ success: true, msg: "Data updated successfully" });
    } catch (error) {
      console.log(error);
      res.send({ error: true, msg: error });
    }
  })();
});

// Delete the course
app.delete("/api/courses/delete/:course_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("courses").doc(req.params.course_id);
      await document.delete();
      return res
        .status(200)
        .send({ success: true, msg: "Data deleted successfully" });
    } catch (error) {
      console.log(error);
      res.send({ error: true, msg: error });
    }
  })();
});
// Export the api to cloud functions
exports.app = functions.https.onRequest(app);
