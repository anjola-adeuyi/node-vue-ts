import { Router } from "express";
import {AuthenticatedUser, Register, Login, Logout, UpdateInfo} from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleware, AuthenticatedUser );
  router.post('/api/logout', AuthMiddleware, Logout );
  router.put('/api/updateinfo', AuthMiddleware, UpdateInfo );
}