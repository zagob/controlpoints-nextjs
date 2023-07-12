import { ChangeEvent } from "react";

export function TransformValueInput(event: ChangeEvent<HTMLInputElement>) {
  event.currentTarget.maxLength = 5;
  let value = event.target.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1:$2");
  event.currentTarget.value = value;
}
