import data from './data.js'
import { searchMovieByTitle, makeBgActive } from './helpers.js'
import { createMovieEl } from './createElement.js'
import { createFiltersBoxes } from './components/FilterBox.js'

class MoviesApp {
  constructor(options) {
    const { root, searchInput, searchForm, yearHandler, genreHandler } = options
    this.$tableEl = document.getElementById(root)
    this.$tbodyEl = this.$tableEl.querySelector('tbody')

    this.$searchInput = document.getElementById(searchInput)
    this.$searchForm = document.getElementById(searchForm)
    this.yearHandler = yearHandler
    this.genreHandler = genreHandler
  }

  fillTable() {
    const moviesHTML = data.reduce((acc, cur) => {
      return acc + createMovieEl(cur)
    }, '')

    this.$tbodyEl.innerHTML = moviesHTML
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
      data
        .filter((movie) => {
          return searchMovieByTitle(movie, searchValue)
        })
        .forEach(makeBgActive)

      document.getElementById('searchInput').value = ''
    })
  }

  handleYearFilter() {
    document.getElementById('yearSubmitter').addEventListener('click', () => {
      this.reset()

      const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value

      data
        .filter((movie) => {
          return movie.year === selectedYear
        })
        .forEach(makeBgActive)
    })
  }

  handleGenreFilter() {
    document.getElementById('genreSubmitter').addEventListener('click', () => {
      this.reset()

      const selectedGenres = [...document.querySelectorAll(`input[name='${this.genreHandler}']:checked`)].map(
        (e) => e.value
      )

      data
        .filter((movie) => {
          return selectedGenres.includes(movie.genre)
        })
        .forEach(makeBgActive)
    })
  }

  init() {
    this.fillTable()
    createFiltersBoxes(data, ['year', 'genre'])
    this.handleSearch()
    this.handleYearFilter()
    this.handleGenreFilter()
  }
}

let myMoviesApp = new MoviesApp({
  root: 'movies-table',
  searchInput: 'searchInput',
  searchForm: 'searchForm',
  yearHandler: 'year',
  genreHandler: 'genre',
})

myMoviesApp.init()
