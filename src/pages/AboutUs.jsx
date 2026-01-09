import { useContext } from "react";
import { DataContext } from "../context/DataContext";

import About from "../sections/About";
import Info from "../sections/Info";

const AboutUs = () => {
  const { data, isLoading } = useContext(DataContext);
  if (isLoading) return <p>Loading...</p>;
  const aboutData = data?.aboutPage?.about;

  return (
    <>
      <Info />
      <About about={aboutData} />
    </>
  );
};

export default AboutUs;
