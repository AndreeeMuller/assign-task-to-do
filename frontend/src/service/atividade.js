/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { http } from './config'

export default {

    getAll () {
        return http.get('v1/atividade')
    },

    getByIdAtividade (idatividade) {
        return http.get('v1/atividade/' + idatividade)
    },

    getAvaiableByIdGrupo (idgrupo) {
        return http.get('v1/atividade/avaiable/' + idgrupo)
    },

    create (payload) {
        return http.post('v1/atividade', payload)
    },

    update (payload) {
        return http.put('v1/atividade/' + payload.idatividade, payload)
    },

    delete (idatividade) {
        return http.delete('v1/atividade/' + idatividade)
    }
}
