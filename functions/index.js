const functions = require("firebase-functions");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codewithvetriapi-c56e3-default-rtdb.firebaseio.com",
});

const express = require("express");
const app = express();

app.use(express.json({}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
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
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

//Reade a specific course based on id
app.get("/api/courses/read/:course_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("courses").doc(req.params.course_id);
      let course = await document.get();
      let courseData = course.data();
      return res.status(200).send({ success: true, data: courseData });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
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
      return res.send({ success: false, msg: `Warning:, ${error}` });
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
      return res.send({ success: false, msg: `Warning:, ${error}` });
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
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Contents API
// Create API
app.post("/api/concept/create", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      await db
        .collection("concept")
        .doc("/" + `${Date.now()}` + "/")
        .create({
          concept_id: `${Date.now()}`,
          course_id: req.body.course_id,
          trainer_id: req.body.trainer_id,
          concept_name: req.body.concept_name,
          concept_img: req.body.concept_img,
          concept_video: req.body.concept_video,
          concept_description: req.body.concept_description,
          html_code: req.body.html_code,
          css_code: req.body.html_code,
          js_code: req.body.html_code,
          other_code: req.body.html_code,
          github_link: req.body.github_link,
          concept_added_date: `${Date.now()}`,
        });
      return res
        .status(200)
        .send({ success: true, msg: "Data added successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

//Reade a specific concept based on id
app.get("/api/concept/read/:concept_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("concept").doc(req.params.concept_id);
      let concept = await document.get();
      let conceptData = concept.data();
      return res.status(200).send({ success: true, data: conceptData });
    } catch (error) {
      console.log(error);
      return res.send({ error: true, msg: error });
    }
  })();
});

// Read all concepts
app.get("/api/concept", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      let query = db.collection("concept");
      let response = [];

      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs; // the result of the query

        for (let doc of docs) {
          const selectedItem = {
            concept_id: doc.data().concept_id,
            course_id: doc.data().course_id,
            trainer_id: doc.data().trainer_id,
            concept_name: doc.data().concept_name,
            concept_img: doc.data().concept_img,
            concept_video: doc.data().concept_video,
            concept_description: doc.data().concept_description,
            html_code: doc.data().html_code,
            css_code: doc.data().html_code,
            js_code: doc.data().html_code,
            other_code: doc.data().html_code,
            github_link: doc.data().github_link,
            concept_added_date: doc.data().concept_added_date,
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value otherwise we could get an exceptions
      });
      return res.status(200).send({ success: true, data: response }); //return response at async function too
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Specific Concepts

app.get("/api/concept/:concept_name", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      let query = db.collection("concept");
      let response = [];

      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs; // the result of the query

        for (let doc of docs) {
          if (doc.data().course_id == req.params.concept_name) {
            const selectedItem = {
              concept_id: doc.data().concept_id,
              course_id: doc.data().course_id,
              trainer_id: doc.data().trainer_id,
              concept_name: doc.data().concept_name,
              concept_img: doc.data().concept_img,
              concept_video: doc.data().concept_video,
              concept_description: doc.data().concept_description,
              html_code: doc.data().html_code,
              css_code: doc.data().html_code,
              js_code: doc.data().html_code,
              other_code: doc.data().html_code,
              github_link: doc.data().github_link,
              concept_added_date: doc.data().concept_added_date,
            };
            response.push(selectedItem);
          }
        }
        return response; // each then should return a value otherwise we could get an exceptions
      });
      return res.status(200).send({ success: true, data: response }); //return response at async function too
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Update concept
app.put("/api/concept/update/:concept_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("concept").doc(req.params.concept_id);
      let concept = await document.get();
      let conceptData = concept.data();

      let course_id = req.body.course_id
        ? req.body.course_id
        : conceptData.course_id;
      let trainer_id = req.body.trainer_id
        ? req.body.trainer_id
        : conceptData.trainer_id;
      let concept_name = req.body.concept_name
        ? req.body.concept_name
        : conceptData.concept_name;
      let concept_img = req.body.concept_img
        ? req.body.concept_img
        : conceptData.concept_img;
      let concept_video = req.body.concept_video
        ? req.body.concept_video
        : conceptData.concept_video;
      let concept_description = req.body.concept_description
        ? req.body.concept_description
        : conceptData.concept_description;
      let html_code = req.body.html_code
        ? req.body.html_code
        : conceptData.html_code;
      let css_code = req.body.css_code
        ? req.body.css_code
        : conceptData.css_code;
      let js_code = req.body.js_code ? req.body.js_code : conceptData.js_code;
      let other_code = req.body.other_code
        ? req.body.other_code
        : conceptData.other_code;
      let github_link = req.body.github_link
        ? req.body.github_link
        : conceptData.github_link;

      await document.update({
        course_id: course_id,
        trainer_id: trainer_id,
        concept_name: concept_name,
        concept_img: concept_img,
        concept_video: concept_video,
        concept_description: concept_description,
        html_code: html_code,
        css_code: css_code,
        js_code: js_code,
        other_code: other_code,
        github_link: github_link,
      });

      return res
        .status(200)
        .send({ success: true, msg: "Data updated successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Delete the concept
app.delete("/api/concept/delete/:concept_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("concept").doc(req.params.concept_id);
      await document.delete();
      return res
        .status(200)
        .send({ success: true, msg: "Data deleted successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Trainers API
// Create API
app.post("/api/trainer/create", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      await db
        .collection("trainer")
        .doc("/" + req.body.trainer_id + "/")
        .create({
          id: `${Date.now()}`,
          trainer_id: req.body.trainer_id,
          trainer_name: req.body.trainer_name,
          email: req.body.email,
          mobile: req.body.mobile,
          designation: req.body.designation,
          trainer_img: req.body.trainer_img,
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          github: req.body.github,
          trainer_added_date: `${Date.now()}`,
        });
      return res
        .status(200)
        .send({ success: true, msg: "Data added successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

//Reade a specific trinaer based on id
app.get("/api/trainer/read/:trainer_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("trainer").doc(req.params.trainer_id);
      let trainer = await document.get();
      let trainerData = trainer.data();
      return res.status(200).send({ success: true, data: trainerData });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

//Verify trainer_id
app.get("/api/trainer/verify/:trainer_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("trainer").doc(req.params.trainer_id);
      let trainer = await document.get().then((doc) => {
        if (doc.exists) {
          return res
            .status(200)
            .send({ success: true, data: "User Id Already Exists" });
        } else {
          return res.status(200).send({ success: true, data: "Valid User" });
        }
      });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Read all trainer
app.get("/api/trainer", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      let query = db.collection("trainer");
      let response = [];

      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs; // the result of the query

        for (let doc of docs) {
          const selectedItem = {
            id: doc.data().id,
            trainer_id: doc.data().trainer_id,
            trainer_name: doc.data().trainer_name,
            email: doc.data().email,
            mobile: doc.data().mobile,
            designation: doc.data().designation,
            trainer_img: doc.data().trainer_img,
            facebook: doc.data().facebook,
            twitter: doc.data().twitter,
            instagram: doc.data().instagram,
            github: doc.data().github,
            trainer_added_date: doc.data().trainer_added_date,
          };
          response.push(selectedItem);
        }
        return response; // each then should return a value otherwise we could get an exceptions
      });
      return res.status(200).send({ success: true, data: response }); //return response at async function too
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Update Trainer
app.put("/api/trainer/update/:trainer_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("trainer").doc(req.params.trainer_id);
      let trainer = await document.get();
      let trainerData = trainer.data();

      let trainer_name = req.body.trainer_name
        ? req.body.trainer_name
        : trainerData.trainer_name;
      let email = req.body.email ? req.body.email : trainerData.email;
      let mobile = req.body.mobile ? req.body.mobile : trainerData.mobile;
      let designation = req.body.designation
        ? req.body.designation
        : trainerData.designation;
      let trainer_img = req.body.trainer_img
        ? req.body.trainer_img
        : trainerData.trainer_img;
      let facebook = req.body.facebook
        ? req.body.facebook
        : trainerData.facebook;
      let twitter = req.body.twitter ? req.body.twitter : trainerData.twitter;
      let instagram = req.body.instagram
        ? req.body.instagram
        : trainerData.instagram;
      let github = req.body.github ? req.body.github : trainerData.github;

      await document.update({
        trainer_name: trainer_name,
        email: email,
        mobile: mobile,
        designation: designation,
        trainer_img: trainer_img,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        github: github,
      });

      return res
        .status(200)
        .send({ success: true, msg: "Data updated successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Delete the Trainer
app.delete("/api/trainer/delete/:trainer_id", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    try {
      const document = db.collection("trainer").doc(req.params.trainer_id);
      await document.delete();
      return res
        .status(200)
        .send({ success: true, msg: "Data deleted successfully" });
    } catch (error) {
      return res.send({ success: false, msg: `Warning:, ${error}` });
    }
  })();
});

// Read all users
app.get("/api/users", (req, res) => {
  (async () => {
    // replace the slash in the file path of our image location
    // List batch of users, 1000 at a time.
    let data = [];
    admin
      .auth()
      .listUsers(1000)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          data.push(userRecord.toJSON());
        });
        return res.status(200).send({ success: true, data: data });
      })
      .catch((error) => {
        return res.send({
          success: false,
          msg: `Error listing users:, ${error}`,
        });
      });
  })();
});
// Get single user
app.get("/api/users/read/:uid", (req, res) => {
  (async () => {
    const uid = req.params.uid;
    admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return res
          .status(200)
          .send({ success: true, data: userRecord.toJSON() });
      })
      .catch((error) => {
        return res.send({
          success: false,
          msg: `Error fetching user data:, ${error}`,
        });
      });
  })();
});

// Export the api to cloud functions
exports.app = functions.https.onRequest(app);
