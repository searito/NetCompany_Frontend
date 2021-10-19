export function reset (state) {
  state = {
    loading: true,
    appliedFilters: [],
    externalFilters: [],
    filterable: {
      title: '',
      url: '',
      orderables: [],
      filterGroups: []
    },
    pagination: {
      sortBy: 'id',
      descending: false,
      filter_match: 'and',
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10
    },
    collection: {},
    dataViewer: {
      show: false,
      filter: false,
      allowCreate: false,
      showForm: 0
    }

  }
}

export function setCollection (state, data) {
  state.collection = data
}

export function setAuthorization (state, data) {
  state.authorization = data
}

export function setDataViewer (state, data) {
  state.dataViewer = data
}

export function setFilterable (state, data) {
  state.filterable = data
}

export function setPagination (state, data) {
  state.pagination = data
}

export function setAppliedFilters (state, data) {
  state.appliedFilters = data
}

export function setExternalFilters (state, data) {
  switch (data.option) {
    case 'push':
      state.externalFilters.push(data.value)
      break
    case 'replace':
      state.externalFilters[data.key] = data.value
      break
    case 'splice':
      state.externalFilters.splice(data.key, 1)
      break
  }
}
