import placeholderImage from "../images/movie_img_placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function AppMain({ moviesAndTvSeriesResults }) {
  function getFlagCode(language) {
    if (language === "en") return "gb";
    if (language === "it") return "it";
    if (language === "ja") return "jp";
    if (language === "es") return "es";
    if (language === "fr") return "fr";
    if (language === "de") return "de";

    return null;
  }

  const posterBaseUrl = "https://image.tmdb.org/t/p/w342";

  function getStars(voteAverage) {
    const rating = Math.ceil(voteAverage / 2);
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon className="star" icon={faStarSolid} key={i} />,
        );
      } else {
        stars.push(
          <FontAwesomeIcon className="star" icon={faStarRegular} key={i} />,
        );
      }
    }

    return stars;
  }

  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {moviesAndTvSeriesResults.map((movieResult) => {
              const flagCode = getFlagCode(movieResult.originalLanguage);
              return (
                <div className="col" key={movieResult.id}>
                  <div className="card text-bg-dark">
                    {movieResult.posterPath ? 
                    <img
                      src={`${posterBaseUrl}${movieResult.posterPath}`}
                      className="card-img"
                      alt={movieResult.title}
                    /> :(
                      <img
                      src={placeholderImage}
                      className="card-img"
                      alt='placeholder'
                    />

                    )}
                    <div className="card-img-overlay">
                      <h5 className="card-title">{movieResult.title}</h5>
                      <h6>{movieResult.originalTitle}</h6>
                      <div>
                        {flagCode ? (
                          <span className={`fi fi-${flagCode}`}></span>
                        ) : (
                          movieResult.originalLanguage.toUpperCase()
                        )}
                      </div>
                      <div>{getStars(movieResult.voteAverage)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
