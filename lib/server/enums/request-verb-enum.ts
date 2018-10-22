import {Enum} from "enumify";

const RequestVerb = Enum;
RequestVerb.initEnum([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
]);

export default RequestVerb;
