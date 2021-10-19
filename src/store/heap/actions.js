import { axiosInstance, cancelSource } from 'boot/axios'

let timeoutReload
export function reset (context) {
  context.commit('reset', null)
}

export function fetch (state, data) {
  const p = new Promise(function (resolve, reject) {
    cancelSource.cancel()
    cancelSource.setSource()

    clearTimeout(timeoutReload)

    var pagination = {
      order_column: state.getters.pagination.sortBy,
      order_direction: state.getters.pagination.descending ? 'desc' : 'asc',
      filter_match: state.getters.pagination.filter_match,
      limit: state.getters.pagination.rowsPerPage,
      page: state.getters.pagination.page,
      total: state.getters.pagination.rowsNumber
    }

    // Get External Filters
    var f = {}
    var externalFilters = (state.getters.externalFilters)
    if (externalFilters.length > 0) {
      externalFilters = externalFilters.filter(val => {
        return val.data.length > 0
      })
    }
    externalFilters.forEach((filter, i) => {
      f['e[${' + i + '}][column]'] = filter.key
      f['e[${' + i + '}][data]'] = JSON.stringify(filter.data)
    })

    var params = {
      ...state.getters.getFilters,
      ...f,
      ...pagination
    }

    if (state.getters.dataViewer.showForm == 0) {
      return axiosInstance['post'](state.getters.filterable.url + 'data', null, {
        params: params,
        cancelToken: cancelSource.getSource().token
      })
        .then(response => {
          if (JSON.stringify(response.data.collection) !== JSON.stringify(state.getters.collection)) {
            state.commit('setCollection', response.data.collection)
            var order_direction = true
            if (pagination.order_direction === 'asc') order_direction = false
            pagination = {
              sortBy: pagination.order_column,
              descending: order_direction,
              filter_match: pagination.filter_match,
              page: response.data.collection.current_page,
              rowsPerPage: response.data.collection.per_page,
              rowsNumber: response.data.collection.total
            }
            state.commit('setPagination', pagination)
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
        .finally(() => {
          timeoutReload = setTimeout(function () {
            fetch(state, data)
          }, 5000)
        })
    } else {
      timeoutReload = setTimeout(function () {
        fetch(state, data)
      }, 5000)
    }
  })
  return p
}

export function setFilterable (context, payload) {
  context.commit('setFilterable', payload)
}

export function setExternalFilters (context, payload) {
  context.commit('setExternalFilters', payload)
}

export function setPagination (context, payload) {
  context.commit('setPagination', payload)
}

export function setAppliedFilters (context, payload) {
  context.commit('setAppliedFilters', payload)
}

export function setDataViewer (context, payload) {
  context.commit('setDataViewer', payload)
}
