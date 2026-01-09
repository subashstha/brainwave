import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Info = ({ info }) => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <p>Loading...</p>;
  const infoData = info || data?.defaults?.info;

  if (!infoData) return null;

  const { title, text } = infoData;

  return (
    <section className="info-block info-block--alt py-10 md:py-15 lg:py-30">
      <div className="container md:flex md:flex-wrap">
        {title && <h2 className="info__title flex-1 mb-6 md:pe-10">{title}</h2>}
        {text && (
          <div
            className="info__text md:w-[48%] [&_p]:mb-5 md:pe-10"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Info;
