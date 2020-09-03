import Vue from 'vue'
import grupo from '../service/grupo'
import grupoatividade from '../service/grupoatividade'

Vue.prototype.$service = { grupo, grupoatividade }
