<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-list two-line subheader>
          <v-subheader inset>properties</v-subheader>
          <template v-for="(item, index) in properties">
            <v-list-tile :to="{name: 'singlePropertyTab', params: {id: item.id, tabName: 'general'}}">
              <v-list-tile-avatar>
                <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.reference }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.link_path }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: new Date(),
      time: new Date()
    }
  },
  computed: {
    properties() {
      return this.$store.state.propertiesStore.properties
    }
  },
  mounted: function() {
    this.$store.dispatch('loadProperties')
  },
  methods: {

  }
}

</script>
