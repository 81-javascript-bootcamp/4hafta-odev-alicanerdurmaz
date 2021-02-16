export const createMovieEl = (movie) => {
  const { image, title, genre, year, id } = movie
  return `<tr data-id="${id}"><td><img src="${image}" onerror="this.src='./assets/img/ImagePlaceholder.png'"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
}
