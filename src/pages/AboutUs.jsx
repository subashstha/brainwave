import About from "../sections/About";
import { blogs } from "../data/blogs";
import Info from "../sections/Info";

const AboutUs = () => {
  return (
    <>
      <Info />
      <About about={blogs.aboutPage.about} />
    </>
  );
};

export default AboutUs;
