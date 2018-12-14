import { firestore } from 'firebase/app';

export class Aboutus {
    $key: string;
    title: string;
    details: string;
    timestamp: firestore.FieldValue;
}
