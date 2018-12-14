import { firestore } from 'firebase/app';

export class User {
    uid: string;
    email?: string | null;
    displayName?: string;
}
