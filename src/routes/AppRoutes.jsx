import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConfig";
import Layout from "/src/layout/Layout";
import Home from "/src/pages/Home";
import AboutUs from "/src/pages/AboutUs";
import Blog from "/src/pages/Blog";
import BlogDetail from "/src/pages/BlogDetail";
import Contact from "/src/pages/Contact";
import Author from "/src/pages/Author";
import AuthorDetail from "/src/pages/AuthorDetail";
import Category from "/src/pages/Category";
import CategoryDetail from "/src/pages/CategoryDetail";
import Login from "/src/pages/Login";
import Signup from "/src/pages/Signup";
import PrivacyPolicy from "/src/pages/PrivacyPolicy";
import ProtectedRoute from "/src/protected/ProtectedRoute";
import Dashboard from "/src/pages/Dashboard";
import Profile from "/src/pages/Profile";
import NotFound from "/src/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<AboutUs />} />
        <Route path={ROUTES.BLOG} element={<Blog />} />
        <Route path={ROUTES.BLOGSLUG} element={<BlogDetail />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.AUTHOR} element={<Author />} />
        <Route path={ROUTES.AUTHORSLUG} element={<AuthorDetail />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />
        <Route path={ROUTES.CATEGORYSLUG} element={<CategoryDetail />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>

        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
