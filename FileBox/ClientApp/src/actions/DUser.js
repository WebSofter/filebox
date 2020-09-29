import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    SIGNIN: 'SIGNIN',
    SIGNUP: 'SIGNUP'
}

const formateData = data => ({
    ...data,
    idPricing: parseInt(data.idPricing ? data.idPricing : 0)
})

export const fetchAll = () => dispatch => {
    api.DUser().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.DUser().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.DUser().update(id, data)
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
    api.DUser().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const signIn = (data, onSuccess, onWarning, onError) => dispatch => {
    console.log(data)
    api.DUser().signIn(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.SIGNIN,
                payload: res.data
            })

            if(res.data.toString().length <1){
                onWarning()
            }else{
                onSuccess()
            }
        })
        .catch(err => { 
            console.log(err)
            onError();
        })
}

export const signUp = (data, onSuccess, onWarning, onError) => dispatch => {
    data = formateData(data)
    api.DUser().signUp(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.SIGNUP,
                payload: res.data
            })
            
            if(res.data == "error"){
                onWarning()
            }else{
                onSuccess()
            }
        })
        .catch(err => { 
            console.log(err)
            onError();
        })
}