import {
    RxJsonSchema
} from 'rxdb'

import {Model} from "./model";

const schema: RxJsonSchema<Model> = {
    title: 'hero schema',
    description: 'describes a simple hero',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        userId: {type: 'string', primary: true},
        name: {type: 'string'},
        avatar: {type: 'string'},
        avatarMax: {type: 'string'},
        channel: {type: 'string'},
        channelId: {type: 'string'},
        email: {type: 'string'},
        employeeNatureCode: {type: 'string'},
        family: {type: 'string'},
        familyId: {type: 'string'},
        job: {type: 'string'},
        manager: {type: 'string'},
        statusCode: {type: 'string'},
        statusName: {type: 'string'},
        active: {type: 'boolean '},
    },
    required: ['userId']
}

export default schema;
