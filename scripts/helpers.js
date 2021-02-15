export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
}

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background = '#d7f0f7'
}

export const parseFiltersFromMovieData = (movieData) => {
  let filterDataByYear = {}
  let filterDataByGenre = {}

  movieData.forEach((movie, index) => {
    filterDataByGenre.hasOwnProperty(movie.genre)
      ? filterDataByGenre[movie.genre]++
      : (filterDataByGenre[movie.genre] = 1)

    filterDataByYear.hasOwnProperty(movie.year) ? filterDataByYear[movie.year]++ : (filterDataByYear[movie.year] = 1)
  })

  return { filterDataByGenre, filterDataByYear }
}
