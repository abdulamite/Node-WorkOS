const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv").config();
const { WorkOS } = require("@workos-inc/node");

const app = express();
const router = express.Router();

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    state: "",
  })
);

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;
const organizationID = process.env.WORKOS_ORG_ID;
const directoryID = process.env.WORKOS_DIRECTORY_ID;
const redirectURI = "https://workos-node.onrender.com/callback";

router.get("/", (req, res) => {
  if (session.isloggedin) {
    res.render("login_successful.ejs", {
      profile: session.profile,
      fullName: session.fullName,
    });
  } else {
    res.render("index.ejs", { title: "Home" });
  }
});

router.post("/login", (req, res) => {
  const login_type = req.body.login_method;

  const params = {
    clientID: clientID,
    redirectURI: redirectURI,
    state: "",
  };

  if (login_type === "saml") {
    params.organization = organizationID;
  } else {
    params.provider = login_type;
  }

  try {
    const url = workos.sso.getAuthorizationUrl({
      clientId: process.env.WORKOS_CLIENT_ID,
      redirectUri: redirectURI,
      state: "",
      organization: organizationID,
    });

    res.redirect(url);
  } catch (error) {
    res.render("error.ejs", { error: error });
  }
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const profile = await workos.sso.getProfileAndToken({
      code,
      clientId: process.env.WORKOS_CLIENT_ID,
    });
    const json_profile = JSON.stringify(profile, null, 4);

    session.fullName =
      profile.profile.firstName + " " + profile.profile.lastName;
    session.profile = json_profile;
    session.isloggedin = true;

    res.redirect("/");
  } catch (error) {
    res.render("error.ejs", { error: error });
  }
});

router.get("/logout", async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      res.render("error.ejs", { error: error });
    }
  });
  
router.get("/users", async (req, res) => {
  try {
    if (session.isloggedin) {
      const usersFromDirectory = await workos.directorySync.listUsers({
        directory: directoryID,
      });

      session.users = usersFromDirectory.data;
      res.render("user_list.ejs", { title: "Users", users: session.users });
    } else {
      res.render("index.ejs", { title: "Home" });
    }
  } catch (error) {
    res.render("error.ejs", { error: error });
  }
});

module.exports = router;
