import { Component } from 'react';
import fetchMovies from './servises/movies-api';
import Button from './Button/Button';
export class App extends Component {
  state = {
    isMoviesShow: folse,
    page: 1,
    movies: [],
    isLoading: true,
  };
  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShow } = this.state;
    if (prevState.isMoviesShow !== isMoviesShow && isMoviesShow) {
    }
  }

  showFlmsList = () => {
    this.setState(prevState => ({ isMoviesShow: !prevState.isMoviesShow }));
    this.getMovies();
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies()
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState, !prevState.isMoviesShow],
        }));
      })
      .catch(error => console.log(error)).finally(()=>this,state);
  };

  render() {
    const { showFlmsList } = this;
    const { isMoviesShow, movies } = this.state;
    return (
      <>
        <Button
          clickHandler={showFlmsList}
          text={isMoviesShow ? 'Hide' : 'Show'}
        />
        {isMoviesShow&& <MoviesGallery movies={movies} />}
      </>
    );
  }
}
