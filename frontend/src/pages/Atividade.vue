<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="keyboard_arrow_left" :to="{ name: $route.params.idgrupo ? 'grupo/atividade' : 'inicio', params: $route.params }" />
          <q-toolbar-title>
            {{ page.title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <div class="row fit" v-for="atividade in atividades" :key="atividade.idatividade">
        <div class="col-auto" v-if="$route.params.idgrupo">
          <q-checkbox v-model="selection" color="primary" :val="atividade.idatividade" class="q-mt-sm" />
        </div>
        <div class="col q-pa-xs">
          <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator>
              <template v-slot:header>
                <q-item-section>
                  {{ atividade.titulo }}
                </q-item-section>
                <q-item-section side>
                  <div class="row q-gutter-sm">
                    <div class="col-auto">
                      <q-btn @click.stop :to="{ name: 'atividade/editar', params: { idatividade: atividade.idatividade } }" flat round size="sm" color="positive" icon="edit" />
                    </div>
                    <div class="col-auto">
                      <q-btn @click.stop="deleteAtividade(atividade)" flat round size="sm" color="negative" icon="delete" />
                    </div>
                  </div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section style="white-space: pre-line; padding-top: 0; margin-top: -10px;">
                  {{ atividade.descricao }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <q-footer elevated v-if="$route.params.idgrupo">
        <q-toolbar>
          <q-toolbar-title>
            <q-btn flat label="Continuar" type="submit" class="full-width"/>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-form>
    <div class="no-tasks absolute-center text-center" v-if="!atividades.length">
      <q-icon name="warning"
              size="100px"
              color="primary">
      </q-icon>
      <div class="text-h5 text-center text-primary">
        Nenhuma atividade localizada
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{ name: 'atividade/nova' }" :size="!atividades.length ? 'xl' : 'md'" />
    </q-page-sticky>
  </q-page>
</template>

<script>

export default {
  name: 'Atividade',
  data () {
    return {
      page: {
        title: this.$route.params.idgrupo ? 'Adicionar Atividade' : 'Atividade'
      },
      atividades: [],
      selection: []
    }
  },
  methods: {
    submit () {
      const idatividade = Object.assign([], this.selection)

      this.$q.loading.show()
      this.$service.grupoatividade.create(this.$route.params.idgrupo, idatividade)
        .then((response) => {
          this.$router.push({ name: 'grupo/atividade', params: { idgrupo: this.$route.params.idgrupo } })
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
    getAll () {
      this.$q.loading.show()
      this.$service.atividade.getAll()
        .then((response) => {
          this.atividades = response.data
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
    getAvaiableByIdGrupo (idgrupo) {
      this.$q.loading.show()
      this.$service.atividade.getAvaiableByIdGrupo(idgrupo)
        .then((response) => {
          this.atividades = response.data
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
    deleteAtividade (atividade) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Tem certeza que deseja remover "' + atividade.titulo + '"?',
        ok: 'Ok',
        cancel: 'Cancelar'
      }).onOk(() => {
        this.$q.loading.show()
        this.$service.atividade.delete(atividade.idatividade)
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
    if (this.$route.params.idgrupo) {
      this.getAvaiableByIdGrupo(this.$route.params.idgrupo)
    } else {
      this.getAll()
    }
  }
}
</script>
