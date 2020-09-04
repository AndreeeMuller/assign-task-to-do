/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { http } from './config'

export default {

    getAll () {
        return http.get('v1/grupo')
    },

    getByIdGrupo (idgrupo) {
        return http.get('v1/grupo/' + idgrupo)
    },

    create (payload) {
        return http.post('v1/grupo', payload)
    },

    update (payload) {
        return http.put('v1/grupo/' + payload.idgrupo, payload)
    },

    delete (idgrupo) {
        return http.delete('v1/grupo/' + idgrupo)
    }
}
