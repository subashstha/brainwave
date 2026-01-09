// import { useContext } from "react";
// import { DataContext } from "../context/DataContext";

import Banner from "../sections/Banner";
import Info from "../sections/Info";
import About from "../sections/About";
import Team from "../sections/Team";
import RelatedPost from "../sections/RelatedPost";

const Home = () => {
  // const { data, isLoading } = useContext(DataContext);
  // if (isLoading) return <p>Loading...</p>;
  // const bannerData = data?.defaults?.banner;

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
