import {
  Navbar,
  Nav,
  NavDropdown,
  NavLink,
  useState,
  useEffect,
  useDispatch,
  setDescribe,
  useSelector,
  getTotals,
  FontAwesomeIcon,
  Link,
  openLoginModal,
  isLoginUser,
  user,
  setIsLogIn,
} from "../../Constants.js";
import Logo from "../Logo";
import "./Navbar.css";
const NavbarHeader = () => {
  const [expanded, setExpanded] = useState(false);
  const handleNavLinkClick = () => setExpanded(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleOpenLoginModal = () => {
    dispatch(setDescribe(""));
    dispatch(openLoginModal());
  };
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const isLogin = useSelector(isLoginUser);
  const userInfo = useSelector(user);

  console.log(userInfo);
  return (
    <header>
      <div className="NavbarHeader container">
        <Navbar
          expand="lg"
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        >
          <Logo />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between"
            id="basic-navbar-nav"
          >
            <Nav>
              <NavLink
                className="link"
                activeclassname="active"
                to="/"
                onClick={handleNavLinkClick}
              >
                Home
              </NavLink>
              <NavLink
                className="link"
                activeclassname="active"
                to="/products"
                onClick={handleNavLinkClick}
              >
                Products
              </NavLink>
              <NavDropdown
                activeclassname="active"
                className="link "
                title="Services"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>&gt; PCB Services</NavDropdown.Item>
                <NavDropdown.Item>&gt; Projects Idea</NavDropdown.Item>
                <NavDropdown.Item>&gt; 3D Printing</NavDropdown.Item>
              </NavDropdown>
              {isLogin && userInfo.roles[0] !== "ROLE_CUSTOMER" && (
                <>
                  <NavLink
                    className="link"
                    activeclassname="active"
                    onClick={handleNavLinkClick}
                    to="/pos"
                  >
                    {" "}
                    POS{" "}
                  </NavLink>

                  <NavDropdown
                    className="link "
                    title="Item Manager"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      &gt;
                      <NavLink
                        className="link"
                        activeclassname="active"
                        onClick={handleNavLinkClick}
                        to="/allItems"
                      >
                        {" "}
                        All Items{" "}
                      </NavLink>
                    </NavDropdown.Item>
                    {userInfo.roles[0] !== "ROLE_TECHNICAL" && (
                      <NavDropdown.Item>
                        &gt;
                        <NavLink
                          className="link"
                          activeclassname="active"
                          onClick={handleNavLinkClick}
                          to="/newItem"
                        >
                          New Item
                        </NavLink>
                      </NavDropdown.Item>
                    )}
                    {userInfo.roles[0] !== "ROLE_TECHNICAL" && (
                      <NavDropdown.Item>
                        &gt;
                        <NavLink
                          className="link"
                          activeclassname="active"
                          onClick={handleNavLinkClick}
                          to="/newKit"
                        >
                          New Kit
                        </NavLink>
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                  {userInfo.roles[0] !== "ROLE_TECHNICAL" && (
                    <NavLink
                      className="link"
                      activeclassname="active"
                      onClick={handleNavLinkClick}
                      to="/transactions"
                    >
                      {" "}
                      Transactions{" "}
                    </NavLink>
                  )}
                </>
              )}
              <NavLink
                className="link"
                activeclassname="active"
                to="/about"
                onClick={handleNavLinkClick}
              >
                About
              </NavLink>
              <NavLink
                className="link"
                activeclassname="active"
                to="/contact"
                onClick={handleNavLinkClick}
              >
                Contact
              </NavLink>
            </Nav>
            <div className="nav-login ">
              {isLogin ? (
                <div
                  className="link "
                  style={{
                    border: "2px solid #777",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                  onClick={() => dispatch(setIsLogIn(false))}
                >
                  Logout
                </div>
              ) : (
                <div className="link" onClick={handleOpenLoginModal}>
                  Login
                </div>
              )}

              {!(isLogin && userInfo.roles[0] !== "ROLE_CUSTOMER") && (
                <Link
                  to={"/cart"}
                  onClick={handleNavLinkClick}
                  className="cart-count link"
                >
                  <FontAwesomeIcon
                    className="icon-cart"
                    icon="fa fa-shopping-cart"
                  />
                  <span className="count">{cartTotalQuantity}</span>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default NavbarHeader;
