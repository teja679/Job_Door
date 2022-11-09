import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './Components/AuthPage/AuthPage';
import Applications from './Components/Candidate/Applications';
import CandidateConversation from './Components/Candidate/CandidateConversation';
import CandidateJobs from './Components/Candidate/CandidateJobs';
import CandidateOnboarding from './Components/Candidate/CandidateOnboarding';
import CandidateProfile from './Components/Candidate/CandidateProfile';
import LandingPage from './Components/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />

        <Route path='/candidateOnboarding' element={<CandidateOnboarding />} />
        <Route path='candidate/jobs' element={<CandidateJobs />} />
        <Route path='candidate/conversation' element={<CandidateConversation />} />
        <Route path='candidate/profile' element={<CandidateProfile />} />
        <Route path='candidate/applications' element={<Applications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
