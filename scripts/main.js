import data from './data.js'
import { searchMovieByTitle, makeBgActive } from './helpers.js'
import { createFiltersBoxes } from './components/FilterBox.js'

class MoviesApp {
  constructor(options) {
    const { root, searchInput, searchForm, yearHandler, genreHandler, filterContainer } = options
    this.$tableEl = document.getElementById(root)
    this.$tbodyEl = this.$tableEl.querySelector('tbody')

    this.$searchInput = document.getElementById(searchInput)
    this.$searchForm = document.getElementById(searchForm)
    this.$filterContainer = document.getElementById(filterContainer)
    this.yearHandler = yearHandler
    this.genreHandler = genreHandler
  }

  createMovieEl = (movie) => {
    const { image, title, genre, year, id } = movie
    return `<tr data-id="${id}"><td><img src="${image}" onerror="this.src='./assets/img/ImagePlaceholder.png'"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
  }

  fillTable() {
    const moviesHTML = data.reduce((acc, cur) => {
      return acc + this.createMovieEl(cur)
    }, '')

    this.$tbodyEl.innerHTML = moviesHTML
  }

  reset(inputResetNames) {
    this.$tbodyEl.querySelectorAll('tr').forEach((item) => {
      item.style.background = 'transparent'
    })

    const queryFromArray = inputResetNames
      .reduce((acc, curr) => {
        return acc + `input[name='${curr}']:checked,`
      }, '')
      .slice(0, -1)

    document.querySelectorAll(`${queryFromArray}`).forEach((item) => {
      item.checked = false
    })
  }

  handleSearch() {
    this.$searchForm.addEventListener('submit', (event) => {
      event.preventDefault()

      this.reset([this.genreHandler, this.yearHandler])

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
      this.reset([this.genreHandler])

      const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`)?.value

      data
        .filter((movie) => {
          return movie.year === selectedYear
        })
        .forEach(makeBgActive)
    })
  }

  handleGenreFilter() {
    document.getElementById('genreSubmitter').addEventListener('click', () => {
      this.reset([this.yearHandler])

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
    createFiltersBoxes(data, ['year', 'genre'], this.$filterContainer)
    this.handleSearch()
    this.handleYearFilter()
    this.handleGenreFilter()
  }
}

let myMoviesApp = new MoviesApp({
  root: 'movies-table',
  searchInput: 'searchInput',
  searchForm: 'searchForm',
  filterContainer: 'filters',
  yearHandler: 'year',
  genreHandler: 'genre',
})

myMoviesApp.init()
