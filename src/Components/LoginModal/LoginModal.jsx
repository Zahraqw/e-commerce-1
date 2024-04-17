import {
  loginUser,
  setIsLogIn,
  logoImage,
  FontAwesomeIcon,
  useState,
  Link,
  Modal,
  useDispatch,
  describeLoginModal,
  showLoginModal,
  useSelector,
  closeLoginModal,
} from "../../Constants.js";
import "./loginModal.css";
const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector(showLoginModal);
  const describe = useSelector(describeLoginModal);
  const { loading, error } = useSelector((state) => state.user);

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);

  const handleClose = () => dispatch(closeLoginModal());

  const handleLoginEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    dispatch(loginUser(formData))
      .then((result) => {
        if (result.payload) {
          setEmail("");
          setPassword("");
          handleClose();
          dispatch(setIsLogIn(true));
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Log or console.log the error details for debugging
      });
  };

  return (
    <Modal className="loginCont" show={showModal} onHide={handleClose} centered>
      <Modal.Header className="flex-column-reverse" closeButton>
        <div className="logo-login">
          <img src={logoImage} alt="logo" />
        </div>
        <h2 id="title">Log in</h2>
      </Modal.Header>
      <Modal.Body>
        <p>{describe}</p>
        <form
          className="d-flex flex-column align-items-center p-4"
          onSubmit={handleLoginEvent}
        >
          <div className="input-group">
            <div className="input-field" id="emailField">
              <FontAwesomeIcon icon={"fa-envelope"} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field" id="passwordField">
              <FontAwesomeIcon icon="fa-lock" />
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p id="toggle-password" onClick={handlePasswordToggle}>
                <FontAwesomeIcon
                  id="eye-slash"
                  icon={passwordVisible ? "eye" : "eye-slash"}
                />
              </p>
            </div>
            {error && (
              <p className="mb-2 text-danger error-message">* {error}</p>
            )}
          </div>

          <button className="submit mt-2" type="submit" id="loginBtn">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="mod-footer px-4">
          <p id="lostPass">
            <Link className="lin"> Forgot your password?</Link>
          </p>
          <p className="reg">
            No account?
            <Link className="lin" onClick={handleClose} to="/register">
              Register
            </Link>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
