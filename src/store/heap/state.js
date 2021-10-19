export default function () {
  return {
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
