const Express = require("express");
const content = Express.Router();
const contentCtrl = require("./content.ctrl");

content.route("/").post(contentCtrl.write);
content.route("/:contentId").get(contentCtrl.read);
content.route("/:contentId").delete(contentCtrl.remove);
content.route("/:contentId").patch(contentCtrl.update);

module.exports = content;
