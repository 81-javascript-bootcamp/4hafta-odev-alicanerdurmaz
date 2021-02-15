import data from './data.js'
import { searchMovieByTitle, makeBgActive, parseFiltersFromMovieData } from './helpers.js'
import { createMovieEl, createYearEl, createGenreEl } from './createElement.js'

class MoviesApp {
  constructor(options) {
    const { root, searchInput, searchForm, yearHandler, yearSubmitter } = options
    this.$tableEl = document.getElementById(root)
    this.$tbodyEl = this.$tableEl.querySelector('tbody')

    this.$searchInput = document.getElementById(searchInput)
    this.$searchForm = document.getElementById(searchForm)
    this.yearHandler = yearHandler
    this.$yearSubmitter = document.getElementById(yearSubmitter)
    this.$filterByYearContainer = document.getElementById('filter-by-year')
    this.$filterByGenreContainer = document.getElementById('filter-by-genre')
  }

  fillTable() {
    const moviesHTML = data.reduce((acc, cur) => {
      return acc + createMovieEl(cur)
    }, '')

    this.$tbodyEl.innerHTML = moviesHTML
  }

  fillFilters(filters) {
    const { filterDataByGenre, filterDataByYear } = filters

    this.$filterByGenreContainer.innerHTML = Object.keys(filterDataByGenre).reduce((acc, cur) => {
      return acc + createGenreEl({ genre: cur, count: filterDataByGenre[cur] })
    }, '')

    this.$filterByYearContainer.innerHTML = Object.keys(filterDataByYear).reduce((acc, cur) => {
      return acc + createYearEl({ year: cur, count: filterDataByYear[cur] })
    }, '')
  }

  reset() {
    this.$tbodyEl.querySelectorAll('tr').forEach((item) => {
      item.style.background = 'transparent'
    })
  }

  handleSearch() {
    this.$searchForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.reset()
      const searchValue = this.$searchInput.value
      const matchedMovies = data
        .filter((movie) => {
          return searchMovieByTitle(movie, searchValue)
        })
        .forEach(makeBgActive)
    })
  }

  handleYearFilter() {
    this.$yearSubmitter.addEventListener('click', () => {
      this.reset()
      const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value
      const matchedMovies = data
        .filter((movie) => {
          return movie.year === selectedYear
        })
        .forEach(makeBgActive)
    })
  }

  init() {
    this.fillTable()
    this.handleSearch()
    this.handleYearFilter()
    this.fillFilters(parseFiltersFromMovieData(data))
  }
}

let myMoviesApp = new MoviesApp({
  root: 'movies-table',
  searchInput: 'searchInput',
  searchForm: 'searchForm',
  yearHandler: 'year',
  yearSubmitter: 'yearSubmitter',
})

myMoviesApp.init()
