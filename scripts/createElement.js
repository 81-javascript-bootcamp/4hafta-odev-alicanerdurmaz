export const createMovieEl = (movie) => {
  const { image, title, genre, year, id } = movie
  return `<tr data-id="${id}"><td><img src="${image}" onerror="this.src='./assets/img/ImagePlaceholder.png'"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
}

export const createYearEl = (data) => {
  const { year, count } = data
  return `
  <div class="form-check">
    <input class="form-check-input" type="radio" name="year" id="${year}" value=${year} />
    <label class="form-check-label" for=${year}>${year}</label>
    <span class="filter-count">(${count})</span>
  </div>
  `
}

export const createGenreEl = (data) => {
  const { genre, count } = data

  return `
  <div class="form-check">
    <input class="form-check-input" type="checkbox" name="genre" value=${genre} id=${genre} />
    <label class="form-check-label" for="${genre}">${genre}</label>
    <span class="filter-count">(${count})</span>
  </div>`
}
