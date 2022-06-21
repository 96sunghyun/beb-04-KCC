import Express from "express";
import * as contentCtrl from "./content.ctrl";
const content = Express.Router();

content.route("/").post(contentCtrl.write);
content.route("/:contentId").get(contentCtrl.checkObjectId, contentCtrl.read);
content
  .route("/:contentId")
  .delete(contentCtrl.checkObjectId, contentCtrl.remove);
content
  .route("/:contentId")
  .patch(contentCtrl.checkObjectId, contentCtrl.update);

export default content;
