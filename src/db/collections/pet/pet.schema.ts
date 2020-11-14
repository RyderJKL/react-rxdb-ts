import {
    RxJsonSchema
} from 'rxdb'

import {PetModel} from "./pet.model";

export type PetSchema = RxJsonSchema<PetModel>;

const userSchema: RxJsonSchema<PetModel> = {
    title: 'pet schema',
    description: 'describes a simple pet',
    version: 1,
    keyCompression: false,
    type: 'object',
    properties: {
        petId: {type: 'string', primary: true},
        name: {type: 'string'},
        avatar: {type: 'string'},
        avatarMax: {type: 'string'},
        // master: { type: 'string', ref: 'hero'}
    },
    required: ['petId']
}

export default userSchema;
