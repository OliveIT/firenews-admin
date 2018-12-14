export class Upload {
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
    constructor(file: File) {
        this.file = file;
    }
}