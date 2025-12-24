import About from "../sections/About";
import Banner from "../sections/Banner";
import Info from "../sections/Info";
import RelatedPost from "../sections/RelatedPOst";
import Team from "../sections/Team";

const Home = () => {
  return (
    <>
      <Banner />
      <Info />
      <About />
      <Team />
      <RelatedPost />
    </>
  );
};

export default Home;
