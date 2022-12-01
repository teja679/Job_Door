import React, { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AuthPage from "../Components/AuthPage";
import Applications from "../Components/Candidate/Applications";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import Applicants from "../Components/Employer/Applicants";
import EmployerProfile from "../Components/Employer/EmployerProfile";
import EmployerJobs from "../Components/Employer/EmployerJobs";
import EmployerOnboarding from "../Components/Employer/EmployerOnboarding";
import EmployerConversation from "../Components/Employer/EmployerConversation";
import LandingPage from "../Components/LandingPage";
import CandidateHoc from "../Components/Hoc/CandidateHoc";
import EmployerHoc from "../Components/Hoc/EmployerHoc";
import { UserContext } from "../Components/context/UserContext";

function Navs() {
  const [state, dispatch] = useContext(UserContext)
  // const user = JSON.parse(localStorage.getItem("user")) || null;
  // const userinfo = JSON.parse(localStorage.getItem("userinfo")) || null;
  const CandidateProtactedRotes = () => {
    // if ("a" === "a")
    if (state.user && state.userInfo?.type === "candidate")
     return <Outlet />;
    else return <Navigate to="/" />;
  };
  const EmployerProtactedRotes = () => {
    // if ("a" === "a")
    if (state.user && state.userInfo?.type === "employer")
     return <Outlet />;
    else return <Navigate to="/" />;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/candidate/auth"
            element={<AuthPage type="candidate" />}
          />
          <Route path="/employer/auth" element={<AuthPage type="employer" />} />
          <Route
            path="candidate/onboarding"
            element={
                <CandidateOnboarding />
              // <CandidateHoc>
              // </CandidateHoc>
            }
          />
          <Route element={<CandidateProtactedRotes />}>
            <Route
              path="candidate/jobs"
              element={
                <CandidateHoc>
                  <CandidateJobs />
                </CandidateHoc>
              }
            />
            <Route
              path="candidate/conversation"
              element={
                <CandidateHoc>
                  <CandidateConversation />
                </CandidateHoc>
              }
            />
            <Route
              path="candidate/profile"
              element={
                <CandidateHoc>
                  <CandidateProfile />
                </CandidateHoc>
              }
            />

            <Route
              path="candidate/applications"
              element={
                <CandidateHoc>
                  <Applications />
                </CandidateHoc>
              }
            />
          </Route>
          <Route
            path="employer/onboarding"
            element={
                <EmployerOnboarding />
              // <EmployerHoc>
              // </EmployerHoc>
            }
          />
          <Route element={<EmployerProtactedRotes />}>
            <Route
              path="employer/jobs"
              element={
                <EmployerHoc>
                  <EmployerJobs />
                </EmployerHoc>
              }
            />
            <Route
              path="employer/conversation"
              element={
                <EmployerHoc>
                  <EmployerConversation />
                </EmployerHoc>
              }
            />
            <Route
              path="employer/profile"
              element={
                <EmployerHoc>
                  <EmployerProfile />
                </EmployerHoc>
              }
            />
            <Route
              path="employer/applicants"
              element={
                <EmployerHoc>
                  <Applicants />
                </EmployerHoc>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navs;
