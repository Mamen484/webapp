export class ErrorSnackbarConfig {
    panelClass = 'sf-snackbar-error';

    static createStatic() {
        return new ErrorSnackbarConfig(10e6);
    }

    constructor(public duration = 5000) {
    }
}
