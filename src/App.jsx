import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Pastikan from 'react-router-dom'
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
import { EnrolledCourseShowPage } from "./pages/course/EnrolledCourseShowPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScholarshipDetail from "./pages/scholarsip/ScholarshipDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
import { LearnLayout } from "./layouts/LearnLayout";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />

            <Route path="e-learning" element={<ElearningPage />} />

          <Route path="course">
            <Route path="show/:id" element={<CourseShowPage />} />
          </Route>

          <Route path="enrolled" element={<EnrolledCourseShowPage />} />
              
          <Route path="our-services" element={<OurServices />} />

            <Route path="our-services" element={<OurServices />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="auth/callback" element={<AuthCallbackPage />} />

            <Route path="profile" element={<ProfileLayout />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route
                path="my-order-history"
                element={<MyProfileOrderHistory />}
              />
              <Route
                path="my-enrolled-courses"
                element={<MyProfileEnrolledCourse />}
              />
            </Route>

            <Route path="learn" element={<LearnLayout />}>
              <Route path=":id" element={<ElearningPage />} />
            </Route>

            <Route path="scholarship" element={<ScholarshipPage />} />
            <Route
              path="scholarship/show/:id"
              element={<ScholarshipDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
