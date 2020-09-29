import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    DELETE_ALL: 'DELETE_ALL',
    FETCH_ALL: 'FETCH_ALL',
    UPLOAD: 'UPLOAD',
    DOWNLOAD: 'DOWNLOAD',
    COUNT: 'COUNT'
}

const formateData = data => ({
    ...data,
    //idPricing: parseInt(data.idPricing ? data.idPricing : 0)
})

export const fetchAll = (id, callback, onSuccess) => dispatch => {
    api.DContent().fetchAll(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data,//.map( entry => { entry.ext = (entry.name.split('.').length < 2 ? "dir" : entry.name.split('.').pop()); return entry; })
            })
            callback(response)
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const count = (id, callback) => dispatch => {
    api.DContent().count(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.COUNT,
                payload: response.data,//.map( entry => { entry.ext = (entry.name.split('.').length < 2 ? "dir" : entry.name.split('.').pop()); return entry; })
            })
            callback(response)
        })
        .catch(err => console.log(err))
}
export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.DContent().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const uploadFile = (data, onSuccess) => dispatch => {
    //data = formateData(data)
    api.DContent().uploadFile(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPLOAD,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}
export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.DContent().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.DContent().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const deleteAll = (ids, onSuccess) => dispatch => {
    //ids = formateData(ids)
    api.DContent().deleteAll(ids)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE_ALL,
                payload: ids
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const download = (ids, name) => dispatch => {
    //ids = formateData(ids)
    api.DContent().download(ids, name)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DOWNLOAD,
                payload: ids
            })
            
            

            let blob = new Blob([response.data], { type: 'application/zip' }),
              url = window.URL.createObjectURL(blob)
            window.open(url)
        })
        .catch(err => console.log(err))
}