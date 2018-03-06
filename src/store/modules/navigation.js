// import axios from 'axios'

// initial state
const state = {
  mainNavItems: [
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
        text: 'Labels',
        href: 'defaultPropertyLabel',
        router: true
      }, {
        icon: 'domain',
        text: 'New Property',
        href: 'newProperty',
        router: true
      }]
    },
    {
      icon: "pages",
      tabTitleKey: "adminSections.pages",
      // tabRoute: "admin.pages",
      // subMenuItems: [],
      // title: 'Attractions',
      isGroupHeader: true,
      childItems: []

    },
    {
      icon: "settings",
      title: 'Website',
      tabTitleKey: "adminSections.content",
      isGroupHeader: true,
      childItems: [{
        icon: 'tv',
        text: 'Settings',
        href: 'adminWebsiteSettings',
        router: true
      }, {
        icon: 'record_voice_over',
        text: 'Language',
        href: 'adminWebsiteLanguages',
        router: true
      }, {
        icon: 'record_voice_over',
        text: 'Site CSS',
        href: 'adminWebsiteCss',
        router: true
      }, {
        icon: 'vertical_align_bottom',
        text: 'Footer',
        href: 'adminWebsiteFooter',
        router: true
      }]
    },
  ],
  propertyTabs: [{
    tabValue: "general",
    tabTitleKey: "propertySections.general",
    componentName: "PropertyGeneralDetails",
  }, {
    tabValue: "text",
    tabTitleKey: "propertySections.text",
    componentName: "PropertyTextDetails",
  }, {
    tabValue: "sale-rental",
    tabTitleKey: "propertySections.sale",
    componentName: "PropertySaleDetails",
  }, {
    tabValue: "location",
    tabTitleKey: "propertySections.location",
    componentName: "PropertyLocationDetails",
  }, {
    tabValue: "features",
    tabTitleKey: "propertySections.extras",
    componentName: "PropertyFeaturesDetails",
  }, {
    tabValue: "photos",
    tabTitleKey: "propertySections.photos",
    componentName: "PropertyPhotosDetails",
  }],
  propertyLabelTabs: [{
    tabValue: "features",
    tabTitleKey: "translationsSections.extras",
    componentName: "PropertyFeatures"
  }, {
    tabValue: "property-types",
    tabTitleKey: "translationsSections.propertyTypes",
    componentName: "PropertyTypes"
    // }, {
    //   tabValue: "property-origins",
    //   tabTitleKey: "translationsSections.propertyOrigins"
  }, {
    tabValue: "property-states",
    tabTitleKey: "translationsSections.propertyStates",
    componentName: "PropertyStates"
    // }, {
    //   tabValue: "transaction-status",
    //   tabTitleKey: "translationsSections.propertyLabels",
    //   componentName: "TransactionStatus"
  },
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
    componentName: "PropertyGeneralDetails",
  }, {
    tabValue: "text",
    tabTitleKey: "propertySections.text",
    componentName: "PropertyTextDetails",
  }, {
    tabValue: "sale-rental",
    tabTitleKey: "propertySections.sale",
    componentName: "PropertySaleDetails",
  }, {
    tabValue: "location",
    tabTitleKey: "propertySections.location",
    componentName: "PropertyLocationDetails",
  }, {
    tabValue: "features",
    tabTitleKey: "propertySections.extras",
    componentName: "PropertyFeaturesDetails",
  }, {
    tabValue: "photos",
    tabTitleKey: "propertySections.photos",
    componentName: "PropertyPhotosDetails",
  }],
  propertyLabelTabs: [{
      tabValue: "features",
      tabTitleKey: "translationsSections.extras",
      componentName: "PropertyFeatures"
    }, {
      tabValue: "property-types",
      tabTitleKey: "translationsSections.propertyTypes",
      componentName: "PropertyTypes"
      // }, {
      //   tabValue: "property-origins",
      //   tabTitleKey: "translationsSections.propertyOrigins"
    }, {
      tabValue: "property-states",
      tabTitleKey: "translationsSections.propertyStates",
      componentName: "PropertyStates"
      // }, {
      //   tabValue: "transaction-status",
      //   tabTitleKey: "translationsSections.propertyLabels",
      //   componentName: "TransactionStatus"
    }
    // ,{
    //   tabValue: "provinces",
    //   tabTitleKey: "translationsSections.provinces"
    // }
  ],
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
