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
      <div class="row fit" v-for="gp in grupoatividade" :key="gp.idgrupoatividade">
        <div class="col-auto" v-if="$route.query.idgrupo">
          <q-checkbox v-model="selection" color="primary" :val="gp.idgrupoatividade" class="q-mt-sm" />
        </div>
        <div class="col q-pa-xs">
          <q-list bordered class="rounded-borders">
            <q-expansion-item expand-separator>
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon :name="gp.icone" />
                </q-item-section>
                <q-item-section>
                  {{ gp.titulo }}
                </q-item-section>
                <q-item-section side>
                  <q-btn @click.stop flat round size="sm" color="green" icon="edit" />
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  {{ gp.descricao }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <q-footer elevated v-if="$route.query.idgrupo">
        <q-toolbar>
          <q-toolbar-title>
            <q-btn flat label="Continuar" type="submit" class="full-width"/>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-form>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" :to="{ name: 'atividade/nova', query: $route.query }" />
    </q-page-sticky>
  </q-page>
</template>

<script>

export default {
  name: 'Atividade',
  data () {
    return {
      page: {
        title: 'Atividade'
      },
      grupoatividade: [
        {
          idgrupoatividade: 1,
          idgrupo: null,
          idatividade: null,
          titulo: 'Lavar a louça',
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non ligula nunc. Etiam tincidunt, purus vel vehicula imperdiet, lorem tellus pharetra quam, a eleifend dui nulla eget mi. Aliquam consequat viverra bibendum. Nam metus nibh, pretium vitae volutpat ac, mattis eget justo. Maecenas viverra sem augue, a aliquet enim pellentesque sed. Vestibulum facilisis mi in nulla placerat, vel pharetra ex iaculis. Vivamus est turpis, sagittis et sollicitudin nec, euismod nec turpis. Suspendisse euismod congue auctor. Nunc ac sollicitudin urna. Donec blandit elit eu libero sodales, sed tristique leo finibus. Sed sit amet leo sed turpis pellentesque faucibus at ac erat. In nunc est, hendrerit sed risus eget, egestas facilisis sem. Integer vel ornare mauris, sit amet rutrum quam.',
          niveldificuldade: 3,
          qtdmaxatividadeseguidausuario: 0,
          permitetroca: 'S',
          icone: 'perm_identity'
        },
        {
          idgrupoatividade: 2,
          idgrupo: null,
          idatividade: null,
          titulo: 'Limpar o banheiro',
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non ligula nunc. Etiam tincidunt, purus vel vehicula imperdiet, lorem tellus pharetra quam, a eleifend dui nulla eget mi. Aliquam consequat viverra bibendum. Nam metus nibh, pretium vitae volutpat ac, mattis eget justo. Maecenas viverra sem augue, a aliquet enim pellentesque sed. Vestibulum facilisis mi in nulla placerat, vel pharetra ex iaculis. Vivamus est turpis, sagittis et sollicitudin nec, euismod nec turpis. Suspendisse euismod congue auctor. Nunc ac sollicitudin urna. Donec blandit elit eu libero sodales, sed tristique leo finibus. Sed sit amet leo sed turpis pellentesque faucibus at ac erat. In nunc est, hendrerit sed risus eget, egestas facilisis sem. Integer vel ornare mauris, sit amet rutrum quam.',
          niveldificuldade: 3,
          qtdmaxatividadeseguidausuario: 0,
          permitetroca: 'S',
          icone: 'save'
        },
        {
          idgrupoatividade: 3,
          idgrupo: null,
          idatividade: null,
          titulo: 'Levar o lixo para rua',
          descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non ligula nunc. Etiam tincidunt, purus vel vehicula imperdiet, lorem tellus pharetra quam, a eleifend dui nulla eget mi. Aliquam consequat viverra bibendum. Nam metus nibh, pretium vitae volutpat ac, mattis eget justo. Maecenas viverra sem augue, a aliquet enim pellentesque sed. Vestibulum facilisis mi in nulla placerat, vel pharetra ex iaculis. Vivamus est turpis, sagittis et sollicitudin nec, euismod nec turpis. Suspendisse euismod congue auctor. Nunc ac sollicitudin urna. Donec blandit elit eu libero sodales, sed tristique leo finibus. Sed sit amet leo sed turpis pellentesque faucibus at ac erat. In nunc est, hendrerit sed risus eget, egestas facilisis sem. Integer vel ornare mauris, sit amet rutrum quam.',
          niveldificuldade: 3,
          qtdmaxatividadeseguidausuario: 0,
          permitetroca: 'S',
          icone: 'add'
        }
      ],
      selection: []
    }
  },
  methods: {
    submit () {
      // Salva as atividades vinculadas ao grupo solicitado e então volta a rota de atividades do grupo, atualizando a mesma

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
      this.$router.push({ name: 'grupo/atividade', query: this.$route.query })
      //   })
    }
  }
}
</script>
