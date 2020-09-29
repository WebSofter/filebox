import axios from "axios";
const port = window.location.port.length < 1 || window.location.port == 3000 ? 5000 : window.location.port;
const baseUrl = `http://${window.location.hostname}:${port}/api/`
console.log(port)
let header = {
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
    }
}

export default {
    DUser(url = baseUrl + 'users/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, header),
            delete: id => axios.delete(url + id),
            signIn: dataIn => axios.post(url + 'signin', dataIn),
            signUp: dataUp => axios.post(url + 'signup', dataUp)
        }
    },
    DContent(url = baseUrl + 'contents/') {
        return {
            fetchAll: id => axios.get(url + 'user/' + id),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url, updateRecord),
            delete: id => axios.delete(url + id),
            deleteAll: ids => axios.post(url + 'delete', ids),
            download: (ids, name) => axios.get(url + 'download/' + name + "?" + ids, {responseType: 'arraybuffer'}),//{ids: [12, 22, 3]}
            uploadFile: formData => axios.post(url + "upload", formData, { headers: { 'content-type': 'multipart/form-data' }} ),
            count: id => axios.get(url + 'count/' + id),
            /*
            fileUpload(file){
                const url = 'http://localhost:5000/api/files/upload';
                const formData = new FormData();
                formData.append('file', file)
                formData.append('idAccess', 1)
                formData.append('idUser', 2)
                formData.append('idFolder', 3)
                formData.append('name', "Имя файла")
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                return  post(url, formData, config)
              }
            */
        }
    },
    DFolder(url = baseUrl + 'folders/') {
        return {
            fetchAll: id => axios.get(url + 'user/' + id),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url, updateRecord, header),// + id
            delete: id => axios.delete(url + id),
            signIn: dataIn => axios.post(url + 'signin', dataIn),
            signUp: dataUp => axios.post(url + 'signup', dataUp)
        }
    },
    DFile(url = baseUrl + 'files/') {
        return {
            fetchAll: id => axios.get(url + 'user/' + id),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, header),
            delete: id => axios.delete(url + id),
        }
    },
    DPricing(url = baseUrl + 'pricings/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord, header),
            delete: id => axios.delete(url + id)
        }
    },
}
