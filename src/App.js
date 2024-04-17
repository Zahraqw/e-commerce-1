import {
  useState,
  FontAwesomeIcon,
  routes,
  navLinks,
  Register,
  Search,
  NavbarHeader,
  Footer,
} from "./Constants.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StateModal from "../src/Components/ProductCard/StateModal";
import LoginModal from "../src/Components/LoginModal/LoginModal";
function App() {
  const [showSearch, setShowSearch] = useState(true);

  return (
    <BrowserRouter basename="/technolab">
      <ToastContainer />
      <ScrollToTop
        smooth
        component={<FontAwesomeIcon icon="fa-solid fa-chevron-up" />}
      />
      <StateModal />
      <LoginModal describe="hi" />
      <NavbarHeader />
      {showSearch && <Search />}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {navLinks.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        <Route
          path="/register"
          element={<Register setShowSearch={setShowSearch} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
