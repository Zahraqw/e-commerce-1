import { contactInfo, FontAwesomeIcon } from "../Constants.js";
const Contact = () => {
  return (
    <div className="container contact">
      <div className="row align-items-stretch">
        <div className="headline">
          <h2>Contact Us</h2>
        </div>
        <div className="col-md-6 mb-5">
          <div className="d-flex flex-column gap-4 ">
            {contactInfo.map((info, index) => (
              <i key={index} className="d-flex gap-3 link">
                <FontAwesomeIcon className="icon" icon={info.icon} />
                {info.value}
              </i>
            ))}
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="col-md-6 mb-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d897.9983848433218!2d35.22215202488524!3d32.2264668488601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce19a1ebead4b%3A0x4e517409c82feccf!2z2LTYsdmD2Kkg2KrZg9mG2YjZhNin2Kgg2KfZhNmD2KrYsdmI2YbZg9iz!5e0!3m2!1sar!2s!4v1705142982700!5m2!1sar!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
