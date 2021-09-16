const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
const { urlencoded } = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// body-parser middleware
app.use(urlencoded({extended: true}));

// static folder for custom/cdn(bootstrap) js and css.
app.use(express.static(path.join(__dirname, "public")));

// signup route
app.post("/signup", (req, res) => {
    const {email} = req.body;

    // validation (make sure fields are filled)
    if(!email) {
        res.redirect("/fail.html");
        return;
    }

    // construct request data
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed"
            }
        ]
    }

    const postData = JSON.stringify(data);

    const options = {
        url: "URL",
        method: "POST",
        headers: {
            Authorization: "AUTH API KEY" // auth apiKey
        },
        body: postData
    }

    request(options, (err, response, body) => {
        if(err) {
            res.redirect("/fail.html");
        } else {
            if(response.statusCode === 200) {
                res.redirect("/success.html");
            } else {
                res.redirect("/fail.html");
            }
        }
    })
})

// listening on port
app.listen(PORT, console.log(`Server started on port ${PORT}`));
