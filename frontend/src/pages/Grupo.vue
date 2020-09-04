<template>
  <q-page padding>
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="keyboard_arrow_left" :to="{ name: 'inicio', params: $route.params }" />
        <q-toolbar-title>
          {{ page.title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <div class="row fit" v-for="grupo in grupos" :key="grupo.idgrupo">
      <div class="col q-pa-xs">
        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section>
              {{ grupo.descricao }}
            </q-item-section>
            <q-item-section side>
              <div class="row q-gutter-sm">
                <div class="col-auto">
                  <q-btn @click.stop :to="{ name: 'grupo/editar', params: { idgrupo: grupo.idgrupo } }" flat round size="sm" color="positive" icon="edit" />
                </div>
                <div class="col-auto">
                  <q-btn @click.stop="deleteGrupo(grupo)" flat round size="sm" color="negative" icon="delete" />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="no-tasks absolute-center text-center" v-if="!grupos.length">
      <q-icon name="warning"
              size="100px"
              color="primary">
      </q-icon>
      <div class="text-h5 text-center text-primary">
        Nenhum grupo localizado
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{ name: 'grupo/novo' }" :size="!grupos.length ? 'xl' : 'md'" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'Grupo',
  data () {
    return {
      page: {
        title: 'Grupo'
      },
      grupos: []
    }
  },
  methods: {
    getAll () {
      this.$q.loading.show()
      this.$service.grupo.getAll()
        .then((response) => {
          this.grupos = response.data
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
    deleteGrupo (grupo) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja remover "' + grupo.descricao + '"?',
        ok: 'Ok',
        cancel: 'Cancelar'
      }).onOk(() => {
        this.$q.loading.show()
        this.$service.grupo.delete(grupo.idgrupo)
          .then((response) => {
            this.$q.notify({
              type: response.data.error ? 'negative' : 'positive',
              message: response.data.message,
              progress: true,
              position: 'top'
            })
            this.getAll()
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
    this.getAll()
  }
}
</script>
