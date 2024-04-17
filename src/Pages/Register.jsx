
import {Yup, useEffect, Form, useState,useFormik } from "../Constants.js";
import DropdownSelector from "../Components/DropdownSelector.jsx";
const Register = ({ setShowSearch }) => {

  const [jobType, setJobType] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const Specialties = ["Computer", "Electrician", "Industrial", "Mechanical", "Civil", "Biomedical", "Other"];
  const Universitys = ["An-Najah National University", "Al-Quds University", "Bethlehem University", "Birzeit University", "Palestine Polytechnic University (PPU)", "Other"]

  useEffect(() => {
    setShowSearch(false);
    return () => {
      setShowSearch(true);
    };
  }, [setShowSearch]);

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
    setSelectedSpecialty("");
    setSelectedUniversity("");
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      lastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Required"),
      address: Yup.string().required("Required"),
      password: Yup.string()
      .required("Required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password should contain at least one uppercase and one lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
      cpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <div className="container mt-4">
      <div className="col-xs-12">
        <div className="row mb-2">
          <div className="mb-2 col-md-12">
            <p>
              By creating a technolab account you will gain full access to all technolab.ps sites.
              You will be able to purchase technolab products and track your orders
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className=" col-md-6">
            <div className='headline mb-2'>
              <h2  >
                Create a new account
              </h2>
            </div>
            <p>All fields are required.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8  mb-5" >
            <Form onSubmit={formik.handleSubmit}>
              <div className='row'>
                <Form.Group className="mb-3 col-md-6" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ahmad"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  <Form.Text className="text-danger">
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-danger">* {formik.errors.firstName}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="mohammad"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName} />
                  <Form.Text className="text-danger">
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-danger">* {formik.errors.lastName}</div>
                    ) : null}
                  </Form.Text>
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ahmad.mohammad@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email} />
                <Form.Text className="text-danger">
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">* {formik.errors.email}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+9725XXXXXXXX"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  />
                  <Form.Text className="text-danger">
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">* {formik.errors.phone}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Address"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
              </Form.Group>
              <div className='row'>
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label>Select Job Type</Form.Label>
                  <Form.Control as="select" onChange={handleJobTypeChange} required>
                    <option value="" disabled selected>Select Job Type</option>
                    <option value="Student">Student</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Technician">Technician</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Hopy">Hopy</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>


                {jobType === "Student" && (
                  <div className="col-md-12 row">
                    <DropdownSelector label="Your University" options={Universitys} setSelectedValue={setSelectedUniversity} />
                    <DropdownSelector label="Your Specialty" options={Specialties} setSelectedValue={setSelectedSpecialty} />
                  </div>
                )}


                {(jobType === "Engineer" || jobType === "Technician") && (
                  <DropdownSelector label="Your Specialty" options={Specialties} setSelectedValue={setSelectedSpecialty} />
                )}


                {jobType === "Instructor" && (
                  <DropdownSelector label=" the university you are working with" options={Universitys} setSelectedValue={setSelectedUniversity} />
                )}


                {jobType === "Other" && (
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Whats Your Jop?</Form.Label>
                    <Form.Control type="text" placeholder="My Jop Is ..." required />
                  </Form.Group>
                )}

                {selectedUniversity === "Other" && (
                  <Form.Group className="mb-3 col-md-12">
                    <Form.Label>Whats Your University?</Form.Label>
                    <Form.Control type="text" placeholder="My University Is ..." required />
                  </Form.Group>
                )}

                {selectedSpecialty === "Other" && (
                  <Form.Group className="mb-3 col-md-12">
                    <Form.Label>Whats Your Specialty?</Form.Label>
                    <Form.Control type="text" placeholder="My Specialty Is ..." required />
                  </Form.Group>
                )}

              </div>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <Form.Text className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">* {formik.errors.password}</div>
                ) : null}
              </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="cpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cpassword}
                />
                <Form.Text className="text-danger">
                {formik.touched.cpassword && formik.errors.cpassword ? (
                  <div className="text-danger">* {formik.errors.cpassword}</div>
                ) : null}
              </Form.Text>
              </Form.Group>
              <button className='submit mt-2' type="submit" id="register" >
                Register
              </button>
            </Form>
          </div>
          <div className="col-md-4 mb-5">

          </div>
        </div>

      </div>
    </div>
  )
}

export default Register
