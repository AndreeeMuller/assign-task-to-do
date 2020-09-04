import Vue from 'vue'
import grupo from '../service/grupo'
import grupoatividade from '../service/grupoatividade'
import atividade from '../service/atividade'

Vue.prototype.$service = { grupo, grupoatividade, atividade }
