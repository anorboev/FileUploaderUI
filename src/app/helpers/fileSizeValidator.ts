import { FormControl } from '@angular/forms';

export function fileSizeValidator(maxSize: number) {
    return function (control: FormControl) {
        const file = control.value;
        if (file && file.size) {
            let maxSizeKB = maxSize * 1024 * 1024;
            if (file.size <= maxSizeKB) {
                return null;
            }
            return {
                fileSizeValidator: true
            };
        }

        return null;
    };
}