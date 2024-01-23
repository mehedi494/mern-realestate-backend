import express from "express";
import { userRoutes } from "../modules/users/user.routes.js";
import { authRoutes } from "../modules/auth/auth.routes.js";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => {
  
  router.use(route.path, route.route);
});
// console.log(moduleRoutes.forEach((route) => console.log(route.route)));
export default router;
