import './App.css';
import AdminNavbar from './Admin/Sidebar/AdminNavbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboards from './Admin/Pages/AdminDashboard.jsx';
import AdminEvents from './Admin/Pages/AdminEvents.jsx';
import AdminArticles from './Admin/Pages/AdminArticles.jsx';
import AdminTeachers from './Admin/Pages/AdminTeachers.jsx';
import AdminCreateAnnouncements from './Admin/Pages/AdminCreateAnnouncements.jsx';
import AdminStudent from './zLandingpage/SplashScreen.jsx';
import AdminLogin from './zLandingpage/AdminLogin.jsx';
import AdminSignup from './zLandingpage/AdminSignup.jsx';
import StudentLogin from './zLandingpage/StudentLogin.jsx';
import StudentSignup from './zLandingpage/StudentSignup.jsx';
import AdminAnnouncements from './Admin/Pages/AdminAnnouncements.jsx';
import StudentNavbar from './Student/StudentNavbar/StudentNavbar.jsx'
import StudentHomepage from './Student/pages/StudentHomepage.jsx';
import StudentEvents from './Student/pages/StudentEvents.jsx';
import StudentArticles from './Student/pages/StudentArticles.jsx';
import StudentFaQs from './Student/pages/StudentFaQs.jsx';
import StudentProfile from './Student/pages/StudentProfile.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<AdminStudent />} />
          <Route path='/Admin/Login' element={<AdminLogin />} />
          <Route path='/Admin/Signup' element={<AdminSignup />} />
          <Route path='/Student/Login' element={<StudentLogin />} />
          <Route path='/Student/Signup' element={<StudentSignup />} />
        </Routes>
      </Router>

      <Router>
        <Routes>
          <Route
            path='/Admin/*'
            element={
              <>
                <AdminNavbar/>
                <Routes>
                  <Route path='/Dashboard' element={<AdminDashboards />} />
                  <Route path='/Announcements' element={<AdminAnnouncements />} />
                  <Route path='/Events' element={<AdminEvents />} />
                  <Route path='/Articles' element={<AdminArticles />} />
                  <Route path='/Teachers' element={<AdminTeachers />} />
                  <Route path='/CreateAnnouncement' element={<AdminCreateAnnouncements />}/>
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>


      <Router>
        <Routes>
          <Route
            path='/Student/*'
            element={
              <>
                <StudentNavbar/>
                <Routes>
                <Route path='/Homepage' element={<StudentHomepage />} />
                <Route path='/Events' element={<StudentEvents />} />
                <Route path='/Articles' element={<StudentArticles />} />
                <Route path='/FaQs' element={<StudentFaQs />} />
                <Route path='/Profile' element={<StudentProfile />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
