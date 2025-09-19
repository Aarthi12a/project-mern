import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import ProtectedRoute from './ProtectedRoute'
import CreateNotebook from "./pages/Notebook/CreateNotebook";
import Notebook from "./pages/Notebook/Notebook";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/create-notebook" element={<CreateNotebook />} />
          <Route path="/notebook/:id" element={<ProtectedRoute><Notebook/></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
