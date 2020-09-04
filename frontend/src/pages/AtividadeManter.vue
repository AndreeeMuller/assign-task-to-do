<template>
  <q-page padding>
    <q-form @submit="submit">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="keyboard_arrow_left" @click="$router.go(-1)" />
          <q-toolbar-title>
            {{ page.title }}
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <div class="row fit q-gutter-md">
        <div class="col-12">
          <q-input  v-model="form.titulo"
                    label="Título"
                    placeholder="Lavar a louça"
                    hint="Informe o título da atividade"
                    autofocus
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Informe o título da atividade']">
          </q-input>
        </div>
        <div class="col-12">
          <q-input  v-model="form.descricao"
                    label="Descrição"
                    type="textarea"
                    placeholder="Lavar a louça na seguinte ordem:

1) Copos;
2) Pratos;
3) Talheres ;
4) Panelas."
                    hint="Informe a descrição do grupo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Informe a descrição do grupo']">
          </q-input>
        </div>
        <div class="col-12 q-mt-lg">
          <div class="q-field__label no-pointer-events ellipsis">Nível de Dificuldade</div>
          <q-slider v-model="form.niveldificuldade"
                    :min="1"
                    :max="5"
                    :step="1"
                    :label-value="nivelDificuldadeLabel(form.niveldificuldade)"
                    markers
                    label
                    color="primary">
          </q-slider>
        </div>
        <div class="col-12 q-mt-lg">
          <div class="q-field__label no-pointer-events ellipsis">Quantidade Máxima Atividade Seguida Usuário</div>
          <q-slider v-model="form.qtdmaxatividadeseguidausuario"
                    :min="0"
                    :max="5"
                    :step="1"
                    :label-value="qtdMaximaAtividadeSeguidaUsuarioLabel(form.qtdmaxatividadeseguidausuario)"
                    markers
                    label
                    color="primary">
          </q-slider>
        </div>
        <div class="col-12 q-mt-lg">
          <div class="q-field__label no-pointer-events ellipsis">Permite Troca?</div>
          <div class="q-gutter-sm">
            <q-radio v-model="form.permitetroca" val="S" label="Sim" />
            <q-radio v-model="form.permitetroca" val="N" label="Não" />
          </div>
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
  </q-page>
</template>

<script>

const defaultForm = {
  titulo: null,
  descricao: null,
  niveldificuldade: 3,
  qtdmaxatividadeseguidausuario: 0,
  permitetroca: 'S'
}

export default {
  name: 'AtividadeManter',
  data () {
    return {
      page: {
        title: this.$route.params.idatividade ? 'Alterando Atividade' : 'Nova Atividade'
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
      this.$service.atividade[payload.idatividade ? 'update' : 'create'](payload)
        .then((response) => {
          this.$router.go(-1)
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
    getByIdAtividade (idatividade) {
      this.$q.loading.show()
      this.$service.atividade.getByIdAtividade(idatividade)
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
    },
    nivelDificuldadeLabel (value) {
      switch (value) {
        case 1: {
          return 'Muito Tranquilo'
        }
        case 2: {
          return 'Tranquilo'
        }
        case 3: {
          return 'Normal'
        }
        case 4: {
          return 'Difícil'
        }
        case 5: {
          return 'Muito Difícil'
        }
        default: {
          return 'Indefinido'
        }
      }
    },
    qtdMaximaAtividadeSeguidaUsuarioLabel (value) {
      switch (value) {
        case 0: {
          return 'Sem limite'
        }
        default: {
          return 'Máximo ' + value
        }
      }
    }
  },
  mounted () {
    if (this.$route.params.idatividade) {
      this.getByIdAtividade(this.$route.params.idatividade)
    }
  }
}
</script>
