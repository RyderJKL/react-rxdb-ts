import schema  from './pet.schema'
import {RxCollection, RxDocument} from 'rxdb';
import { PetModel } from './pet.model';
import methods, { PetDocMethods } from './pet.document.methods'

import statics, { PetCollectionStatics } from './pet.collection.statics'

export type PetDocument = RxDocument<PetModel, PetDocMethods>
export type PetCollection = RxCollection<PetModel, PetDocMethods, PetCollectionStatics>

const petCollection = {
   name: 'pet',
   schema,
   statics,
   methods,
   sync: false
}

export default petCollection;
