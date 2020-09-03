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
      <div class="row fit" v-for="grupoAtividade in grupoAtividades" :key="grupoAtividade.idgrupoatividade">
        <!-- <div class="col-auto">
          <q-checkbox v-model="selection" color="primary" :val="grupoatividade" class="q-mt-sm" />
        </div> -->
        <div class="col q-pa-xs">
          <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator>
              <template v-slot:header>
                <q-item-section>
                  {{ grupoAtividade.titulo }}
                </q-item-section>
                <q-item-section side>
                  <q-btn @click.stop flat round size="sm" color="green" icon="edit" />
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  {{ grupoAtividade.descricao }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <q-footer elevated>
        <q-toolbar>
          <q-toolbar-title>
            <q-btn flat label="Continuar" type="submit" class="full-width"/>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-form>
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 78]" v-if="selection.length > 0">
      <q-btn round color="negative" icon="delete" />
    </q-page-sticky> -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{ name: 'atividade', query: $route.query }" />
    </q-page-sticky>
  </q-page>
</template>

<script>

export default {
  name: 'GrupoAtividade',
  data () {
    return {
      page: {
        title: 'Atividade do Grupo'
      },
      grupoAtividades: []
      // selection: []
    }
  },
  methods: {
    submit () {
      // this.$router.push({ name: 'grupo/atividade', query: this.form })
      // const payload = Object.assign({}, this.form)

      // payload.action = payload.idgrupo ? 'update' : 'create'

      // this.$q.loading.show()
      // this.$service.createOrUpdate('grupo', payload)
      //   .then((response) => {
      //     this.$q.loading.hide()
      //     this.$q.notify({
      //       message: response.data.message,
      //       type: response.data.type
      //     })
      //   })
    },
    getByIdGrupo () {
      this.$q.loading.show()
      this.$service.grupoatividade.getByIdGrupo(this.$route.params.idgrupo)
        .then((response) => {
          this.grupoAtividades = response.data
        })
        .catch((error) => {
          console.log(error)
        })
        .then(() => {
          this.$q.loading.hide()
        })
    }
  },
  mounted () {
    this.getByIdGrupo()
  }
}
</script>
