import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from "./layouts/AppLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import ScrollToTop from "./components/ScrollToTop";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { MyProfile } from "./pages/profile/MyProfile";
import { MyProfileOrderHistory } from "./pages/profile/MyProfileOrderHistory";
import CourseShowPage from "./pages/course/CourseShowPage";
import ScholarshipPage from "./pages/scholarsip/ScholarshipPage";
import { OurServices } from "./pages/OurServices";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="profile" element={<ProfileLayout />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="my-orderhistory" element={<MyProfileOrderHistory />} />
            </Route>

            <Route path="course">
              <Route path="show/:id" element={<CourseShowPage />} />
            </Route>
              
            <Route path="our-services" element={<OurServices />} />

            <Route path="scholarship" element={<ScholarshipPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
