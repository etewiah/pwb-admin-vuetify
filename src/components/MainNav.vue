<template>
  <v-list expand>
    <template v-for="(item, index) in mainNavItems">
      <template v-if="item.isGroupHeader">
        <v-list-group :value="true" expand v-bind:key="item.title">
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }} {{ $t(item.tabTitleKey) }}
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.childItems" v-bind:key="subItem.title" :href="subItem.href" :to="{name: subItem.href, params: subItem.params}" expand>
            <v-list-tile-action>
              <v-icon light v-html="subItem.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="subItem.text"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </template>
      <v-list-tile v-else :href="item.href" :to="{name: item.href}">
        <v-list-tile-action>
          <v-icon light v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.title }} {{ $t(item.tabTitleKey) }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>
<script>
export default {
  computed: {
    mainNavItems() {
      let mainNavItems = this.$store.state.navigationStore.mainNavItems
      let adminPageLinks = this.$store.state.pages

      if (adminPageLinks.length > 0) {
        // TODO - sort adminPageLinks
        let pagesNav = mainNavItems[4]
        let linkTitleKey = "link_title_en"

        adminPageLinks.forEach(function(page) {
          console.log(page)
          let pageNav = {}
          pageNav.href = "site-page-details-default"
          pageNav.text = page[linkTitleKey]
          pageNav.icon = "domain"
          pageNav.router = true
          pageNav.params = {pageName: page["page_slug"]}
          pagesNav.childItems.push(pageNav)
          // debugger
        })

      }
      return mainNavItems

      //       var pagesNav = leftNavItems.findBy("tabTitleKey", "adminSections.pages");
      // var linkTitleKey = "link_title_" + this.get("i18n.locale");
      // var adminPageLinks = model.websiteDetails.admin_page_links || [];
      // var sortedPages = adminPageLinks.sortBy("sort_order_top_nav");
      // sortedPages.forEach(function(page) {
      //   var pageNav = {};
      //   pageNav.tabRoute = "admin.pages.page";
      //   pageNav.tabTitle = page[linkTitleKey];
      //   pageNav.routeParam = page["page_slug"];
      //   pagesNav.subMenuItems.pushObject(pageNav);
      // });
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
