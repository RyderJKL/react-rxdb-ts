import schema  from './schema'

const collection = {
   name: 'user',
   schema,
   pouchSettings: {},
   statics: {},
   methods: {},
   attachments: {},
   options: {},
   migrationStrategies: {},
   autoMigrate: true,
   cacheReplacementPolicy: function(){},
   sync: true
}

export default collection;
