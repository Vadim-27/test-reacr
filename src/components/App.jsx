import { Component } from 'react';
import fetchMovies from './servises/movies-api';
import Button from './Button/Button';
import MoviesGallery from './MoviesGallery/MoviesGallery';
import Modal from './Modal/Modal';


export class App extends Component {
  state = {
    isMoviesShow: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShow, page } = this.state;
    if (
      (prevState.isMoviesShow !== isMoviesShow && isMoviesShow) ||
      (prevState.page !== page && isMoviesShow)
    ) {
      this.getMovies();
    }
    if (!isMoviesShow && isMoviesShow !== prevState.isMoviesShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmsList = () => {
    this.setState(prevState => ({ isMoviesShow: !prevState.isMoviesShow }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { showFilmsList } = this;
    const { isMoviesShow, movies, currentImage } = this.state;
    return (
      <>
        <Button
          clickHandler={showFilmsList}
          text={isMoviesShow ? 'Hide movies list' : 'Show movies list'}
        />
        {isMoviesShow && (
          <>
            <MoviesGallery movies={movies} showModal={this.openModal} />
            <Button text="load more" clickHandler={this.loadMore} />
          </>
        )}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}