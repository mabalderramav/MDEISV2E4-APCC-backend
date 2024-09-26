export class Client {
  code: string;
  name: string;
  cinit: string;
  documenttype: string;
  email: string;

  constructor(
    code: string,
    name: string,
    cinit: string,
    documenttype: string,
    email: string,
  ) {
    this.code = code;
    this.name = name;
    this.cinit = cinit;
    this.documenttype = documenttype;
    this.email = email;
  }
}
