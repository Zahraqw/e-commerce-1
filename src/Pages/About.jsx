import { logoImage } from "../Constants";
const About = () => {
  return (
    <div className="container about">
      <div className="row margin-bottom-30">
        <div className="col-md-12 mb-margin-bottom-30">
          <div className="headline">
            <h2>Technolab</h2>
          </div>
          <p>
            Since 2015, Technolab has been helping turn ideas into reality.
            Whether you're exploring electronic world, building a robot for
            school or prototyping your first product. No matter your vision or
            skill level, our team are on guard. We are here to help you start
            something.
          </p>
          <br />
          <br />
          <img src={logoImage} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default About;
