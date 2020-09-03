<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-header elevated>
        <q-toolbar>
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
  name: 'GrupoNovo',
  data () {
    return {
      page: {
        title: 'Novo Grupo'
      },
      form: Object.assign({}, defaultForm)
    }
  },
  methods: {
    submit () {
      const payload = Object.assign({}, this.form)

      this.$q.loading.show()
      this.$service.grupo[payload.idgrupo ? 'update' : 'create'](payload)
        .then((response) => {
          this.$router.push({ name: 'grupo/atividade', params: { idgrupo: response.data.body.grupo.idgrupo } })
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.$q.loading.hide()
        })
    }
  }
}
</script>
