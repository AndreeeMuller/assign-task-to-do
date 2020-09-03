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
      <!-- <q-rating v-model="form.niveldificuldade"
                size="3.5em"
                color="green-5"
                :max="5"
                :icon="[ 'sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_satisfied', 'sentiment_very_satisfied' ]"
                :color-selected="[ 'light-green-3', 'light-green-6', 'green', 'green-9', 'green-10' ]">
      </q-rating> -->
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
  name: 'AtividadeNova',
  data () {
    return {
      page: {
        title: 'Nova Atividade'
      },
      form: Object.assign({}, defaultForm)
    }
  },
  methods: {
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
    },
    submit () {
      // Cria atividade e volta para a listagem passando a query como parametro se existir, para dar sequencia no cadastro de um grupo

      this.$router.push({ name: 'atividade', query: this.$route.query })
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
    }
  }
}
</script>
