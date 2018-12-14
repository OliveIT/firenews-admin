import { firestore } from 'firebase/app';

export class Contact {
    $key: string;
    email: string;
    phone: string;
    address: string;
    timestamp: firestore.FieldValue;
}

