export function collection (state) {
  return state.collection
}

export function data (state) {
  return state.collection.data
}

export function dataViewer (state) {
  return state.dataViewer
}

export function pagination (state) {
  return state.pagination
}

export function filterable (state) {
  return state.filterable
}

export function appliedFilters (state) {
  return state.appliedFilters
}

export function externalFilters (state) {
  return state.externalFilters
}

export function getFilters (state) {
  const f = {}

  var filters = state.appliedFilters.filter((filter, i) => {
    if (filter.column.name !== undefined) return true
  })

  filters.forEach((filter, i) => {
    f['f[${' + i + '}][column]'] = filter.column.name
    f['f[${' + i + '}][match]'] = filter.filter_match
    f['f[${' + i + '}][operator]'] = filter.operator.name
    f['f[${' + i + '}][query_1]'] = filter.query_1
    f['f[${' + i + '}][query_2]'] = filter.query_2
  })
  return f
}
