import { Router } from "express";
import {AuthenticatedUser, Register, Login} from "./controller/auth.controller";

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthenticatedUser );
}