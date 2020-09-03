/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import { http } from './config'

export default {

    getAll () {
        return http.get('v1/grupo/atividade')
    },

    getByIdGrupo (idgrupo) {
        return http.get('v1/grupo/' + idgrupo + '/atividade')
    }
}
