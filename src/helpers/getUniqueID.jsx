import { v4 as uuid } from "uuid";
export default function getUniqueID() {
  const id = uuid();

  return id;
}
