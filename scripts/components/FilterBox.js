import { parseValuesFromData } from '../helpers.js'

export const createFiltersBoxes = (data, values, mountTo) => {
  const filters = parseValuesFromData(data, values)

  const filtersHTML = values.reduce((acc, curr) => {
    return acc + filtersContainer(curr, filters[curr])
  }, '')

  mountTo.innerHTML = filtersHTML
}

const filtersContainer = (title, data) => {
  return `
  <div class="box">
    <h5>Filter by ${title}</h5>
    <div class="list-filter">${filterListItem(title, data)}</div>
    <button class="btn btn-primary" id="${title}Submitter">Filter</button>
  </div>
  `
}

const filterListItem = (name, data) => {
  return Object.keys(data).reduce((acc, curr) => {
    return (
      acc +
      `
      <div class="form-check">
        <input class="form-check-input" name="${name}" id="${curr}" value="${curr}"
        type="${findInputTypeFromName[name] || 'checkbox'}" />
        <label class="form-check-label" for="${curr}">${curr}</label>
        <span class="filter-count">(${data[curr]})</span>
      </div>
      `
    )
  }, '')
}

const findInputTypeFromName = {
  year: 'radio',
  genre: 'checkbox',
}
