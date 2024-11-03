export class RegisterUserDTO {
    constructor({ name, email, password, location, role }) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.location = location;
      this.role = role || 'user';
    }
  }
  
  export class LoginUserDTO {
    constructor({ email, password }) {
      this.email = email;
      this.password = password;
    }
  }
  
  export class UpdateUserDTO {
    constructor({ name, email, location, role }) {
      this.name = name;
      this.email = email;
      this.location = location;
      this.role = role;
    }
  }