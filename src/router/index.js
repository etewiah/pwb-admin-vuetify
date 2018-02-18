import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PropertiesList from '@/pages/properties/PropertiesList'
import SingleProperty from '@/pages/properties/SingleProperty'
import PropertyLabels from '@/pages/properties/PropertyLabels'
import SinglePropertyTab from '@/pages/properties/SinglePropertyTab'
import GenericContainer from '@/pages/GenericContainer'
import NewProperty from '@/pages/properties/NewProperty'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/admin-vue/',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
        name: 'singleProperty',
        component: SingleProperty,
        children: [{
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
        // name: 'propertiesList',
        component: PropertiesList
      }, {
        path: ':labelName',
        name: 'propertyLabels',
        component: PropertyLabels,
        children: []
      }]
    },

  ]
})
