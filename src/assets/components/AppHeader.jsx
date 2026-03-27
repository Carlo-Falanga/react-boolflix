import boolflixLogo from '../images/boolflix_logo_transparent.svg'

export default function AppHeader({
  searchQuery,
  getMovieNames,
  formControl,
}) {
  return (
    <header>
      <section className='navbar_section'>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img className='nav_logo' src={boolflixLogo} alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                  <a className="nav-link active text-white" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Series
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white">
                    Film
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link text-white">
                    Games
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link text-white">
                    New and popular
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link text-white">
                    My list
                  </a>
                </li>
                 <li className="nav-item">
                  <a className="nav-link text-white">
                    Browse by language
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search" onSubmit={formControl}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={getMovieNames}
                />
                <button
                  className="btn text-white d-flex"
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}
