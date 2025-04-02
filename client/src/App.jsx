import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import AddJourney from "./pages/AddJourney"
import MyJourneys from "./pages/MyJourneys"
import Notifications from "./pages/Notifications"
import MeAsDriver from "./pages/MeAsDriver"
import MeAsPassenger from "./pages/MeAsPassenger"

export default function App() {
  return (
  <BrowserRouter>
    {/*header*/}
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/add-journey" element={<AddJourney/>} />
      {/* <Route path="/my-journeys" element={<MyJourneys/>} /> */}
      <Route path="/me-as-driver" element={<MeAsDriver/>} />
      <Route path="/me-as-passenger" element={<MeAsPassenger/>} />

      <Route path="/notifications" element={<Notifications/>} />
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
      </Route>

    </Routes>
  
  </BrowserRouter>
  )
}
