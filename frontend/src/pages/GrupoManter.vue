<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="keyboard_arrow_left" :to="{ name: 'grupo', params: $route.params }" />
          <q-toolbar-title>
            {{ page.title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-input  v-model="form.descricao"
                label="Descrição"
                placeholder="Família Müller"
                hint="Informe a descrição do grupo"
                autofocus
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Informe a descrição do grupo']">
      </q-input>
      <q-footer elevated>
        <q-toolbar>
          <q-toolbar-title>
            <q-btn flat label="Continuar" type="submit" class="full-width"/>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-form>
  </q-page>
</template>

<script>

const defaultForm = {
  idgrupo: null,
  descricao: null,
  tipoagenda: 'AUTOMATICO'
}

export default {
  name: 'GrupoManter',
  data () {
    return {
      page: {
        title: this.$route.params.idgrupo ? 'Alterando Grupo' : 'Novo Grupo'
      },
      form: Object.assign({}, defaultForm)
    }
  },
  methods: {
    edit (data) {
      this.form = Object.assign({}, defaultForm, data)
    },
    submit () {
      const payload = Object.assign({}, this.form)

      this.$q.loading.show()
      this.$service.grupo[payload.idgrupo ? 'update' : 'create'](payload)
        .then((response) => {
          this.$router.push({ name: 'grupo/atividade', params: { idgrupo: response.data.body.grupo.idgrupo } })
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: 'Não foi possível manter conexão com o servidor. Por favor, entre em contato com o suporte. (' + error + ')',
            progress: true,
            position: 'top'
          })
        })
        .then(() => {
          this.$q.loading.hide()
        })
    },
    getByIdGrupo (idgrupo) {
      this.$q.loading.show()
      this.$service.grupo.getByIdGrupo(idgrupo)
        .then((response) => {
          this.edit(response.data[0])
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: 'Não foi possível manter conexão com o servidor. Por favor, entre em contato com o suporte. (' + error + ')',
            progress: true,
            position: 'top'
          })
        })
        .then(() => {
          this.$q.loading.hide()
        })
    }
  },
  mounted () {
    if (this.$route.params.idgrupo) {
      this.getByIdGrupo(this.$route.params.idgrupo)
    }
  }
}
</script>
