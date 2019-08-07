export class SuccessSnackbarConfig {
    panelClass = 'sf-snackbar-success';
    duration = 3000;
    data: any;

    constructor({duration, data}: { duration?: number, data?: any } = {duration: 3000}) {
        if (duration) {
            this.duration = duration;
        }
        if (data) {
            this.data = data;
        }
    }
}
