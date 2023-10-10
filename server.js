const express = require("express");
const home = require("./routes/home");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const storage = multer.memoryStorage(); // You can configure this according to your needs
const upload = multer({ storage: storage });


const app = express();
app.use(cors());

// Replace bodyParser with express.json() for parsing JSON in the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "oliyadoba@gmail.com",
    pass: "qcqkdskneemtogql"
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// Use the 'upload' middleware to handle multipart/form-data requests
router.post("/", upload.any(), (req, res) => {
  console.log("inside contact api");
  // Access the fields from the req.body
  console.log(req.body);
  const fullName = req.body.fullName;
  const mobileNumber = req.body.mobileNumber;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  console.log(subject);

  const mail = {
    from: fullName,
    to: "oliyadoba@gmail.com",
    subject: `Subject: ${subject}`,
    html: `<p>Name: ${fullName}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${mobileNumber}</p>
           <p>Message: ${message}</p>`,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ error: "The error", details: error });
    } else {
      console.log("Message sent");
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

app.use("/contact", router);
app.use("/home", home);

const port = 5000;
app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
