import userSchema  from './user.schema'

const userCollection = {
   name: 'user',
   schema: userSchema,
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

export default userCollection;
