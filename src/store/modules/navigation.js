// import axios from 'axios'

// initial state
const state = {
  mainNavItems: [
  // {
  //     icon: "fa fa-home",
  //     tabTitleKey: "adminSections.start",
  //     tabRoute: "admin.setup"
  //     // tabRoute: "admin.inicio"
  //   }, {
  //     tabTitleKey: "adminSections.properties",
  //     tabRoute: "admin.propiedades",
  //     icon: 'domain',
  //     text: 'Properties',
  //     href: 'properties',
  //     router: true,
  //   },
    {
      icon: 'domain',
      title: 'Properties',
      tabTitleKey: "adminSections.properties",
      isGroupHeader: true,
      childItems: [{
        icon: 'domain',
        text: 'List',
        href: 'propertiesList',
        router: true
      }, {
        icon: 'domain',
        text: 'New Property',
        href: 'newProperty',
        router: true
      }]
    },
    // {
    //   icon: "fa fa-desktop",
    //   tabTitleKey: "adminSections.content",
    //   tabRoute: "admin.website",
    //   subMenuItems: [{
    //     icon: "fa fa-gear",
    //     tabTitleKey: "adminSections.websiteSettings",
    //     tabRoute: "admin.website.settings"
    //   }, {
    //     icon: "fa fa-keyboard-o",
    //     tabTitleKey: "webContentSections.footer",
    //     tabRoute: "admin.website.details.footer"
    //   }]
    // }, {
    //   icon: "pages",
    //   tabTitleKey: "site pages",
    //   // tabRoute: "admin.pages",
    //   // subMenuItems: [],
    //   // title: 'Attractions',
    //   isGroupHeader: true,
    //   childItems: []

    // }, {
    //   icon: "fa fa-exchange",
    //   tabTitleKey: "adminSections.import",
    //   tabRoute: "admin.io"
    // }, {
    //   icon: "fa fa-user",
    //   tabTitleKey: "adminSections.agencyDetails",
    //   tabRoute: "admin.agency"
    // }, {
    //   icon: "contacts",
    //   tabTitleKey: "adminSections.about",
    //   href: 'about',
    //   router: true
    // }, {
    //   icon: 'money',
    //   text: 'Currencies',
    //   href: 'currencies',
    //   router: true
    // }, {
    //   icon: 'pages',
    //   tabTitleKey: 'Admin Pages',
    //   href: 'admin-pages-list',
    //   router: true
    // }, {
    //   icon: 'contacts',
    //   tabTitleKey: 'Contacts',
    //   href: 'contacts',
    //   router: true
    // }, {
    //   icon: 'contacts',
    //   tabTitleKey: 'Create contact',
    //   href: 'CreateContact',
    //   router: true
    // }
  ],
  propertyTabs: [{
    tabValue: "general",
    tabTitleKey: "propertySections.general",
    componentName: "GeneralPropertyDetails",
  }, {
    tabValue: "text",
    tabTitleKey: "propertySections.text",
    componentName: "TextPropertyDetails",
  }, {
    tabValue: "venta",
    tabTitleKey: "propertySections.sale",
    componentName: "SalePropertyDetails",
  }, {
    tabValue: "situacion",
    tabTitleKey: "propertySections.location",
    componentName: "GeneralPropertyDetails",
  }, {
    tabValue: "features",
    tabTitleKey: "propertySections.extras",
    componentName: "FeaturesPropertyDetails",
  }, {
    tabValue: "fotos",
    tabTitleKey: "propertySections.photos",
    componentName: "GeneralPropertyDetails",
  }],
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
