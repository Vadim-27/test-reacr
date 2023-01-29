const MoviesGallery = ({movies}) => {
    return (
        <ul>
            {movies.map(({ id, title, vote_count: vote, backdrop_pat }) => {
                return (
                  <li key={id}>
                    <p>{title}</p>
                    <p>vote_count: {vote}</p>
                  </li>
                );
            })
            }
            
        </ul>
    )
}
export default MoviesGallery;