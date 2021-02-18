export const searchMovieByTitle = (movie, searchValue) => {
  return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
}

export const makeBgActive = (movie) => {
  document.querySelector(`tr[data-id='${movie.id}']`).style.background = '#d7f0f7'
}

export const parseValuesFromData = (data, values) => {
  let filtersData = {}

  values.forEach((value) => {
    filtersData[value] = {}

    data.forEach((item) => {
      filtersData[value].hasOwnProperty(item[value])
        ? filtersData[value][item[value]]++
        : (filtersData[value][item[value]] = 1)
    })
  })

  return filtersData
}
