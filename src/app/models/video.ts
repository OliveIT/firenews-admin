import { firestore } from 'firebase/app';
export class Video {
    $key: string;
    category: string;
    youtubeLink: string;
    title: string;
    lowerCaseTitle: string;
    details: string;
    image: string;
    active: true;
    timestamp: firestore.FieldValue;
}

