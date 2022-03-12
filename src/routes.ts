import { Router } from "express";
import {AuthenticatedUser, Register, Login, Logout, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import { CreatUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleware, AuthenticatedUser );
  router.post('/api/logout', AuthMiddleware, Logout );
  router.put('/api/updateinfo', AuthMiddleware, UpdateInfo );
  router.put('/api/updateinfo', AuthMiddleware, UpdatePassword );


  router.get('/api/users', AuthMiddleware, Users );
  router.post('/api/users', AuthMiddleware, CreatUser );
  router.get('/api/users/:id', AuthMiddleware, GetUser );
  router.put('/api/users/:id', AuthMiddleware, UpdateUser );
  router.delete('/api/users/:id', AuthMiddleware, DeleteUser );
}