/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { http } from './config'

export default {

    getAll () {
        return http.get('v1/grupo')
    },

    create (payload) {
        return http.post('v1/grupo', payload)
    },

    delete (idgrupo) {
        return http.delete('v1/grupo/' + idgrupo)
    }
}
