export default class Validations {
  static verifyPasswordLength(password: string): Boolean {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  static verifyNameLength(name: string): Boolean {
    if (name.length >= 1) {
      return true;
    } else {
      return false;
    }
  }

  static verifyIfIsEmail(email: string): Boolean {
    if (email.includes('@')) {
      return true;
    } else {
      return false;
    }
  }
}
