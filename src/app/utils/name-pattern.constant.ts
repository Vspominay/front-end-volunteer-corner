import { Validators } from "@angular/forms";

export const NAME_PATTERN = Validators.pattern(
  /^[a-zA-Z '.-]*$/
);