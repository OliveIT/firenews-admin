import { firestore } from 'firebase/app';

export class Category {
    $key: string;
    name: string;
    image: string;
    active: Boolean;
    timestamp: firestore.FieldValue;
}
