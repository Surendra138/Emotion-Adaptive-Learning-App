import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ContentView from "./pages/ContentView";
import Recommendation from "./pages/Recommendation";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourseContent from "./pages/admin/AdminCourseContent";
import AdminCourses from "./pages/admin/adminCourses";

function PrivateRoute({ children }) {
    const { user } = useAuth();

    if(user) {
      const role = user.role;
      if(role === 'student') {
        return children;
      } else {
        return <Navigate to='/admin'/>;
      }
    } else {
      return <Navigate to='/login'/>
    }
    
}


function AdminRoute({ children }) {
    const { user } = useAuth();

    if(user) {
      const role = user.role;
      if(role === 'admin') {
        return children;
      } else {
        return <Navigate to='/'/>;
      }
    } else {
        return <Navigate to='/login'/>
    }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route
          path="/content/:id"
          element={
            <PrivateRoute>
              <ContentView />
            </PrivateRoute>
          }
        />

        <Route
          path="/recommend/:id"
          element={
            <PrivateRoute>
              <Recommendation />
            </PrivateRoute>
          }
        />

        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route 
          path="/admin/courses" 
          element={
            <AdminRoute>
              <AdminCourses />
            </AdminRoute>
          } 
        />

        <Route
          path="/admin/courses/:courseId"
          element={
            <AdminRoute>
              <AdminCourseContent />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;