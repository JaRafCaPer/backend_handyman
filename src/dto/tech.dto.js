export class RegisterTechnicianDTO {
  constructor({ name, email, password, location, workfields }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.location = location;
    this.workfields = workfields;
  }
}

export class UpdateTechnicianDTO {
  constructor({ name, email, location, workfields }) {
    this.name = name;
    this.email = email;
    this.location = location;
    this.workfields = workfields;
  }
}
  
  export class LoginTechnicianDTO {
    constructor({ email, password }) {
      this.email = email;
      this.password = password;
    }
  }