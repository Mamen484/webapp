export class ProgressModel {
    public progress: number;

    constructor(
        public occurrence: number,
        public refreshRate: number,
    ) {}
}