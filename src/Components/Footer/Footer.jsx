import {
  FontAwesomeIcon,
  NavLink,
  Link,
  navLinks,
  contactInfo,
} from "../../Constants.js";
import Logo from "../Logo.jsx";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="w-100 shadow-lg">
      <div className="container">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <Logo className="mt-0" />
            <p className="mt-3 small text-footer-details">
              Since 2015, <strong>Technolab </strong>has been helping turn ideas
              into reality.Whether you're exploring electronic world, building a
              robot for school or prototyping your first product. No matter your
              vision or skill level, our team are on guard. We are here to help
              you start
              <strong> something</strong>.
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-4 mb-5">
                <h4 className="mb-4">Quick links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {navLinks.slice(0, 4).map((link, index) => (
                    <NavLink
                      key={index}
                      className="link mb-2"
                      activeclassname="active"
                      to={link.path}
                    >
                      <FontAwesomeIcon icon="fa-angle-right" /> {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h4 className="mb-4">Contact</h4>
                <div className="d-flex flex-column justify-content-start">
                  <Link
                    target="_blank"
                    className="link mb-2"
                    to="https://maps.app.goo.gl/gUbdUivdbw7VoLGq9"
                  >
                    {" "}
                    <FontAwesomeIcon icon="fa-map-location-dot" /> Go to map
                  </Link>
                  {contactInfo.slice(0, -1).map((info, index) => (
                    <i key={index} className="link mb-2">
                      <FontAwesomeIcon icon={info.icon} />
                      {info.value}
                    </i>
                  ))}
                </div>
              </div>
              <div className="col-md-4 mb-5">
                <h4 className=" mb-4">Follow Us</h4>
                <div className="d-flex gap-3 ">
                  <Link
                    className="link"
                    to="https://www.facebook.com/technolab.electronics"
                    target="_blank"
                  >
                    {" "}
                    <FontAwesomeIcon
                      className="icon fac"
                      icon={["fab", "facebook"]}
                    />
                  </Link>
                  <FontAwesomeIcon
                    className="icon what"
                    icon={["fab", "whatsapp"]}
                  />
                  <FontAwesomeIcon
                    className="icon yout"
                    icon={["fab", "youtube"]}
                  />
                  <FontAwesomeIcon
                    className="icon inst"
                    icon={["fab", "instagram"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex border-top border-light  py-3 mb-2">
          <p className="small text-footer-details m-auto pt-2 mb-0">
            &copy; Copyrights.All rights reserved.
            <Link className="linkT" to="/">
              Technolab.ps
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
