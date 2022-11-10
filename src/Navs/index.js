import React from "react";
import AuthPage from "../Components/AuthPage/AuthPage";
import Applications from "../Components/Candidate/Applications";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import Applicants from "../Components/Employer/Applicants";
import LandingPage from "../Components/LandingPage/LandingPage";
import EmployerOnboarding from "../Components/Employer/EmployerOnboarding";
import EmployerJobs from "../Components/Employer/EmployerJobs";
import EmployerConversation from "../Components/Employer/EmployerConversation";
import EmployerProfile from "../Components/Employer/EmployerProfile";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

function Navs() {
  const CandidateProtactedRotes = () => {
    if ("c" === "a") return <Outlet />;
    else return <Navigate to="/" />;
  };
  const EmployerProtactedRotes = () => {
    if ("a" === "a") return <Outlet />;
    else return <Navigate to="/" />;
  };

  return (
    <div className="nav">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<CandidateProtactedRotes />}>
            <Route
              path="/candidateOnboarding"
              element={<CandidateOnboarding />}
            />
            <Route path="candidate/jobs" element={<CandidateJobs />} />
            <Route
              path="candidate/conversation"
              element={<CandidateConversation />}
            />
            <Route path="candidate/profile" element={<CandidateProfile />} />
            <Route path="candidate/applications" element={<Applications />} />
          </Route>
          <Route element={<EmployerProtactedRotes />}>
            <Route
              path="/employerOnboarding"
              element={<EmployerOnboarding />}
            />
            <Route path="employer/jobs" element={<EmployerJobs />} />
            <Route
              path="employer/conversation"
              element={<EmployerConversation />}
            />
            <Route path="employer/profile" element={<EmployerProfile />} />
            <Route path="employer/applications" element={<Applicants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navs;
