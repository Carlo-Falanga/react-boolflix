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
          <FontAwesomeIcon className="star" icon={faStarSolid} key={i} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon className="star" icon={faStarRegular} key={i} />
        );
      }
    }

    return stars;
  }

  return (
    <>
      {moviesAndTvSeriesResults.map((movieResult) => {
        const flagCode = getFlagCode(movieResult.originalLanguage);

        return (
          <div key={movieResult.id}>
            <div>{movieResult.title}</div>
            <div>{movieResult.originalTitle}</div>

            <div>
              {movieResult.posterPath ? (
                <img
                  src={`${posterBaseUrl}${movieResult.posterPath}`}
                  alt={movieResult.title}
                />
              ) : (
                <img
                  className="placeholder_img"
                  src={placeholderImage}
                  alt="placeholder"
                />
              )}
            </div>

            <div>
              {flagCode ? (
                <span className={`fi fi-${flagCode}`}></span>
              ) : (
                movieResult.originalLanguage.toUpperCase()
              )}
            </div>

            <div>{getStars(movieResult.voteAverage)}</div>
          </div>
        );
      })}
    </>
  );
}