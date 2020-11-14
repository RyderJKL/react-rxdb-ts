import schema  from './pet.schema'
import {RxCollection, RxDocument} from 'rxdb';
import { PetModel } from './pet.model';

export type PetDocument = RxDocument<PetModel, PetDocMethods>
export type PetCollection = RxCollection<PetModel, PetDocMethods, {}>

export interface PetDocMethods {
   getPet(): number;
}

const petCollection = {
   name: 'pet',
   schema,
   methods: {
      getPet (this: PetDocument) {

      }
   },
   sync: false
}

export default petCollection;
