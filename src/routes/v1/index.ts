import express from "express";
import uploadRoute from "./upload.routes";
import userRoute from "./user.routes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/upload",
    route: uploadRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
