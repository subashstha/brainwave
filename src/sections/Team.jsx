import { blogs } from "../data/blogs";
import TeamCard from "../components/teamCard";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  const data = team || blogs.defaults.team;
  const { title, text, teamCards, applyCard } = data;

  return (
    <section className="team-block py-30">
      <div className="container container--lg">
        <div className="team__header text-center max-w-160 mx-auto mb-15">
          {title && <h2>{title}</h2>}
          {text && (
            <div
              className="team__text"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          )}
        </div>
        <div className="team__row flex flex-wrap -mx-3 -mb-8">
          {teamCards &&
            teamCards.map((item, index) => (
              <div className="team__col w-1/4 px-3 pb-8" key={index}>
                <TeamCard teamCards={item} />
              </div>
            ))}

          {applyCard && (
            <div className="team__col w-1/4 px-3">
              <div className="team__card team__card--alt flex flex-col justify-center py-25 px-5">
                {applyCard.title && (
                  <h3 className="team__title">{applyCard.title}</h3>
                )}
                <div className="team__info">
                  <div className="team__btn">
                    {applyCard.btnText &&
                      (() => {
                        const Icon = applyCard.icon;
                        return (
                          <Link to="/" className="btn-arrow" role="button">
                            {applyCard.btnText} <Icon />
                          </Link>
                        );
                      })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
