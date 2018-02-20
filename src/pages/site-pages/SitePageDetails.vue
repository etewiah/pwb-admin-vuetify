<template>
  <div>
    <v-tabs>
      <v-tabs-bar class="cyan" dark>
        <v-tabs-item :to="{name: 'site-page-details', params: {tabName: 'settings'}}" ripple>
          {{ $t("pageSections.pageTitle") }}
        </v-tabs-item>
        <template v-for="(tab, index) in pageTabs">
          <v-tabs-item :to="{name: 'site-page-details', params: {tabName: tab.page_part_key}}" ripple>
            {{ $t(tab.editor_setup.tabTitleKey) }}
          </v-tabs-item>
        </template>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
      </v-tabs-items>
    </v-tabs>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <component :is="pageDetailsComponent" v-bind:currentPage="currentPage"></component>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import PageSettings from '@/components/pages/PageSettings'
export default {
  data() {
    return {
      // pages: [],
      loading: true
    }
  },
  components: {
    PageSettings,
  },

  computed: {
    pageDetailsComponent() {
      // let currentTabName = this.$route.params["tabName"]
      // let currentPropertyTab = this.findBy(this.$store.state.navigationStore.propertyTabs, currentTabName, 'tabValue')
      return "PageSettings"
      // currentPropertyTab[0].componentName
    },

    pageTabs() {
      return this.$store.state.pagesStore.currentPage.page_parts
    },
    currentPage() {
      return this.$store.state.pagesStore.currentPage
    }
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('loadPage', to.params.pageName)
    }
  },
  mounted: function() {
    this.$store.dispatch('loadPage', this.$route.params["pageName"])
  },
  methods: {}
}

</script>
<style scoped>
.title {
/*  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;*/
}

</style>
