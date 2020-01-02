import { FormControl } from '@angular/forms';

export function fileTypeValidator(types: string[]) {
    return function (control: FormControl) {
        const file = control.value;
        if (file && file.name) {
            let splitted = file.name.split('.');
            const extension = splitted[splitted.length - 1];
            if (extension && types.some(x => x == extension.toLowerCase())) {
                return null;
            }
            return {
                fileTypeValidator: true
            };
        }

        return null;
    };
}