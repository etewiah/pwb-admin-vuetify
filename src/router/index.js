import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PropertiesList from '@/pages/properties/PropertiesList'
import SingleProperty from '@/pages/properties/SingleProperty'
import PropertyLabels from '@/pages/properties/PropertyLabels'
import SinglePropertyTab from '@/pages/properties/SinglePropertyTab'
import GenericContainer from '@/pages/GenericContainer'
import NewProperty from '@/pages/properties/NewProperty'
import SitePageDetails from '@/pages/site-pages/SitePageDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/admin-vue/',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/site-pages/:pageName',
      // name: 'site-page',
      component: GenericContainer,
      // redirect: { name: 'single-page-tab' },
      children: [{
          path: '',
          name: 'sitePageDetailsDefault',
          component: SitePageDetails,
        },
        {
          path: ':tabName',
          name: 'site-page-details',
          component: SitePageDetails,
          // children: [{
          //   name: 'single-page-tab',
          //   path: ':tabName',
          //   component: SitePageDetails
          // }]
        }
      ]
    }, {
      path: '/properties',
      name: 'properties',
      redirect: { name: 'propertiesList' }
    }, {
      path: '/properties/view',
      component: GenericContainer,
      children: [{
        path: '',
        name: 'propertiesList',
        component: PropertiesList
      }, {
        path: ':id',
        component: SingleProperty,
        children: [{
          name: 'singleProperty',
          path: '',
          redirect: to => {
            const { params } = to
            // const { hash, params, query } = to
            // This will not trigger if I route to 'singleProperty' within app
            return { name: 'singlePropertyTab', params: { tabName: 'general', id: params.id } }
            // if (query.to === 'foo') {
            //   return { path: '/foo', query: null }
            // }
          } // redirect: { name: 'singlePropertyTab', params: {tabName: 'general'} }
        }, {
          name: 'singlePropertyTab',
          path: ':tabName',
          component: SinglePropertyTab
        }]
      }]
    },
    {
      path: '/properties/new',
      name: 'newProperty',
      component: NewProperty,
    }, {
      path: '/properties/labels',
      component: GenericContainer,
      children: [{
        path: '',
        name: 'defaultPropertyLabel',
        redirect: to => {
          const { params } = to
          return { name: 'propertyLabels', params: { labelName: 'features' } }
        }
      }, {
        name: 'propertyLabels',
        path: ':labelName',
        component: PropertyLabels,
        children: []
      }]
    },

  ]
})
