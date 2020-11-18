import {
    RxJsonSchema
} from 'rxdb'

import {HeroModel} from './hero.model'

// type JsonSchema<DocType = any> = {
//     properties: {
//         [key in keyof DocType]: key extends object ? { properties: JsonSchema<key>  } : string
//     }
// }
//
// const demoHero: JsonSchema<HeroModel> = {
//     properties: {
//         name: 'jack',
//         color: '34',
//         hp: '334',
//         maxHP: '344',
//         pet: {
//             properties: {
//                 pet: 'hh',
//                 petId: '34'
//             }
//         }
//     }
// }
export type HeroSchema = RxJsonSchema<HeroModel>;
const schema: HeroSchema = {
    title: 'hero schema',
    description: 'describes a simple hero',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        heroId: {
            type: 'string',
            default: ''
        },
        heroName: {
            type: 'string',
            primary: true,
        },
        color: {
            type: 'string',
            default: ''
        },
        maxHP: {
            type: 'number',
            minimum: 0,
            maximum: 1000
        },
        hp: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            default: 100
        },
        team: {
            description: 'color of the team this hero belongs to',
            type: 'string'
        },
        skills: {
            type: 'array',
            maxItems: 5,
            uniqueItems: true,
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    damage: {
                        type: 'number'
                    }
                }
            },
            default: []
        },
        pet: {
            type: 'object',
            properties: {
                petId: {type: 'string', ref: 'pet'},
                name: {type: 'string'},
                heroId: {type: 'string'}
            }
        }
    },
    required: ['heroId', 'heroName', 'color', 'hp', 'maxHP']
}

export default schema;
