import heroSchema  from './hero.schema'

const userCollection = {
    name: 'hero',
    schema: heroSchema,
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
