<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="keyboard_arrow_left" :to="{ name: 'grupo/editar', params: $route.params }" />
          <q-toolbar-title>
            {{ page.title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <div class="row fit" v-for="grupoAtividade in grupoAtividades" :key="grupoAtividade.idgrupoatividade">
        <div class="col q-pa-xs">
          <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator>
              <template v-slot:header>
                <q-item-section>
                  {{ grupoAtividade.titulo }}
                </q-item-section>
                <q-item-section side>
                  <div class="row q-gutter-sm">
                    <div class="col-auto">
                      <q-btn @click.stop :to="{ name: 'atividade/editar', params: { idatividade: grupoAtividade.idgrupoatividade } }" flat round size="sm" color="positive" icon="edit" />
                    </div>
                    <div class="col-auto">
                      <q-btn @click.stop="deleteGrupoAtividade(grupoAtividade)" flat round size="sm" color="negative" icon="delete" />
                    </div>
                  </div>
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
    <div class="no-tasks absolute-center text-center" v-if="!grupoAtividades.length">
      <q-icon name="warning"
              size="100px"
              color="primary">
      </q-icon>
      <div class="text-h5 text-center text-primary">
        Nenhuma atividade grupo localizada
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{ name: 'grupo/atividade/adicionar', params: { idgrupo: $route.params.idgrupo } }" :size="!grupoAtividades.length ? 'xl' : 'md'" />
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
    }
  },
  methods: {
    submit () {
      console.log('oi')
    },
    getByIdGrupo (idgrupo) {
      this.$q.loading.show()
      this.$service.grupoatividade.getByIdGrupo(idgrupo)
        .then((response) => {
          this.grupoAtividades = response.data
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
    deleteGrupoAtividade (grupoAtividade) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja remover "' + grupoAtividade.titulo + '"?',
        ok: 'Ok',
        cancel: 'Cancelar'
      }).onOk(() => {
        this.$q.loading.show()
        this.$service.grupoatividade.delete(grupoAtividade.idgrupoatividade)
          .then((response) => {
            this.$q.notify({
              type: response.data.error ? 'negative' : 'positive',
              message: response.data.message,
              progress: true,
              position: 'top'
            })
            this.getByIdGrupo(this.$route.params.idgrupo)
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
      }).onCancel(() => {
        this.$q.notify({
          message: 'Ufa, essa foi por pouco, excelente escolha!',
          type: 'info',
          progress: true,
          position: 'top'
        })
      }).onDismiss(() => {
      })
    }
  },
  mounted () {
    this.getByIdGrupo(this.$route.params.idgrupo)
  }
}
</script>
