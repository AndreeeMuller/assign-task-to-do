/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { http } from './config'

export default {

    getAll () {
        return http.get('v1/grupo/atividade')
    },

    getByIdGrupo (idgrupo) {
        return http.get('v1/grupo/' + idgrupo + '/atividade')
    },

    create (idgrupo, idatividade) {
        return http.post('v1/grupo/' + idgrupo + '/atividade', { idatividade })
    },

    delete (idgrupoatividade) {
        return http.delete('v1/grupo/atividade/' + idgrupoatividade)
    }
}
