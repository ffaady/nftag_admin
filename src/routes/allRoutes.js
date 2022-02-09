import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import Users from "../pages/Users/Users";
import UsersProfile from "../pages/UserProfile/UserProfile";

import MarketPlace from '../pages/MarketPlace/MarketPlace';
import Collections from '../pages/Collections/Collection';
import Assets from '../pages/Assets/Assets';

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // // //profile
  { path: "/profile", component: UserProfile },

  { path: "/users", component: Users },
  { path: "/user/:id", component: UsersProfile },

  { path: "/marketplace", component: MarketPlace },
  { path: "/collections/:id", component: Collections },
  { path: "/assets/:id", component: Assets },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { userRoutes, authRoutes }
