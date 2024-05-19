"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { models: { User, Role }, } = require("./models");
const { Strategy, ExtractJwt } = passportJWT;
const app = express();
app.use(bodyParser.json());
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "my_key",
};
passport.use(new Strategy(jwtOptions, async (payload, done) => {
    const currentTime = Date.now();
    //set 5 minute expair token time
    if (payload.time + 1000 * 60 * 5 < currentTime) {
        return done(null, false);
    }
    else {
        const user = await User.findOne({
            where: { id: payload.id },
            rows: true,
        });
        if (user) {
            const { RoleId } = user;
            const Dbroles = await Role.findOne({
                where: { id: RoleId },
                rows: true,
            });
            return done(null, {
                id: user.id,
                userName: user.userName,
                role: Dbroles.role,
            });
        }
        else {
            return done(null, false);
        }
    }
}));
app.use("/medication", passport.authenticate("jwt", { session: false }), require("./routes/medication"));
app.use("/customer", passport.authenticate("jwt", { session: false }), require("./routes/customer"));
app.use("/user", passport.authenticate("jwt", { session: false }), require("./routes/user"));
app.use("/login", require("./routes/login"));
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;
