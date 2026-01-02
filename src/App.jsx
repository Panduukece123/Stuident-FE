import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { ArticlePage } from "./pages/ArticlePage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScholarshipDetail from "./pages/scholarsip/Detail/ScholarshipDetailPage";
import ScholarshipApplicationPage from "./pages/scholarsip/scholarshipApplication/ScholarshipApplicationPage";
import { LearnLayout } from "./layouts/LearnLayout";
import { MyPortfolio } from "./pages/profile/MyPortfolio";
import AdminLayout from "./layouts/AdminLayout";
import { ManageUsers } from "./pages/admin/AdminUsers";
import AdminRoute from "./components/route/AdminRoute";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCurriculumCourse from "./pages/admin/AdminCurriculums";
import AdminTransactions from "./pages/admin/AdminTransactions";
import CorporateRoute from "./components/route/CorporateRoute";
import CorporateLayout from "./layouts/CorporateLayout";
import { CorporateScholarships } from "./pages/corporate/CorporateScholarships";
import { MyProfileMySession } from "./pages/profile/MyProfileMySession";
import MyMentoringSessionDetail from "./pages/profile/MyMentoringSessionDetail";
import { MentorPage } from "./pages/MentorPage";
import { MentorDetail } from "./pages/Mentor/MentorDetail";
import { MyProfileScholarshipApplication } from "./pages/profile/MyProfileScholarshipApplication";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="users" element={<ManageUsers />} />
              <Route path="courses">
                <Route index element={<AdminCourses />} />
                <Route path=":id" element={<AdminCurriculumCourse />} />
              </Route>
              <Route path="scholarships" element={<CorporateScholarships />} />
              <Route path="transactions" element={<AdminTransactions />} />
            </Route>
          </Route>

          <Route element={<CorporateRoute />}>
            <Route path="corporate" element={<CorporateLayout />}>
              <Route path="scholarships" element={<CorporateScholarships />} />
            </Route>
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="e-learning" element={<ElearningPage />} />
            <Route path="my-mentor" element={<MentorPage />} />
            <Route path="my-mentor/:id" element={<MentorDetail />} />
            <Route path="course">
              <Route path="show/:id" element={<CourseShowPage />} />
            </Route>
            <Route path="our-services" element={<OurServices />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="auth/callback" element={<AuthCallbackPage />} />
            <Route path="profile" element={<ProfileLayout />}>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="my-profile/portfolio" element={<MyPortfolio />} />
              <Route
                path="my-order-history"
                element={<MyProfileOrderHistory />}
              />
              <Route
                path="my-enrolled-courses"
                element={<MyProfileEnrolledCourse />}
              />
              <Route
                path="my-mentoring-sessions"
                element={<MyProfileMySession />}
              />
              <Route
                path="my-mentoring-sessions/:id"
                element={<MyMentoringSessionDetail />}
              />
              <Route
                path="my-scholarship-applications"
                element={<MyProfileScholarshipApplication />}
              />
            </Route>

            <Route path="article" element={<ArticlePage />} />
            <Route path="article/:id" element={<ArticleDetailPage />} />
            <Route path="scholarship" element={<ScholarshipPage />} />
            <Route
              path="scholarship/show/:id"
              element={<ScholarshipDetail />}
            />
            <Route
              path="scholarship/application/:id"
              element={<ScholarshipApplicationPage />}
            />
          </Route>

          <Route element={<LearnLayout />}>
            <Route
              path="my-courses/learn/:id"
              element={<EnrolledCourseShowPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
