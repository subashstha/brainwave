const TeamCard = ({ teamCards }) => {
  const { image, imageDesc, title, designation } = teamCards;
  return (
    <>
      <div className="team__card">
        <figure className="team__img mb-4 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={imageDesc}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="team__info">
          <h3 className="team__title mb-0">{title}</h3>
          <span className="team__designation text-base">{designation}</span>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
