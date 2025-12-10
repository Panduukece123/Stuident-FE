import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { ElearningPage } from "./pages/ElearningPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import ScrollToTop from "./components/ScrollToTop";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { MyProfile } from "./pages/profile/MyProfile";
import { MyProfileOrderHistory } from "./pages/profile/MyProfileOrderHistory";
import CourseShowPage from "./pages/course/CourseShowPage";
import ScholarshipPage from "./pages/scholarsip/ScholarshipPage";
import { OurServices } from "./pages/OurServices";
import { AuthCallbackPage } from "./pages/auth/AuthCallbackPage";
import { MyProfileEnrolledCourse } from "./pages/profile/MyProfileEnrolledCourse";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />

          <Route path="e-learning" element={<ElearningPage />} />

          <Route path="elearning-detail" element={<CourseShowPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="auth/callback" element={<AuthCallbackPage />} />

          <Route path="profile" element={<ProfileLayout />}>
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-order-history" element={<MyProfileOrderHistory />} />
            <Route path="my-enrolled-course" element={<MyProfileEnrolledCourse />} />
          </Route>

          <Route path="course-detail" element={<CourseShowPage />} />

          <Route path="our-services" element={<OurServices />} />

          <Route path="scholarship" element={<ScholarshipPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
