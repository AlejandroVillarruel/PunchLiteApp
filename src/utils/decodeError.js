export default function DecodeError(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/user-not-found":
      return "User not found";

    case "auth/wrong-password":
      return "Password provided is not correct";

    case "auth/email-already-in-use":
      return "Email already in use";

    case "auth/weak-password":
      return "Password provided is too weak";

    case "auth/too-many-requests":
      return "Too many requests. Try again later";

    case "auth/user-disabled":
      return "User disabled";

    case "auth/operation-not-allowed":
      return "Operation not allowed";

    case "auth/account-exists-with-different-credential":
      return "Account exists with different credential";

    case "auth/credential-already-in-use":
      return "Credential already in use";

    case "auth/invalid-credential":
      return "Invalid credential";

    case "auth/invalid-verification-code":
      return "Invalid verification code";

    case "auth/invalid-verification-id":
      return "Invalid verification id";

    case "auth/missing-verification-code":
      return "Missing verification code";

    case "auth/missing-verification-id":
      return "Missing verification id";

    case "auth/phone-number-already-exists":
      return "Phone number already exists";

    case "auth/invalid-phone-number":
      return "Invalid phone number";

    case "auth/missing-phone-number":
      return "Missing phone number";

    case "auth/quota-exceeded":
      return "Quota exceeded";

    case "auth/captcha-check-failed":
      return "Captcha check failed";

    case "auth/invalid-app-credential":
      return "Invalid app credential";

    case "auth/invalid-app-id":
      return "Invalid app id";

    case "auth/invalid-verification-payload":
      return "Invalid verification payload";

    case "auth/internal-error":
      return "Internal error";

    default:
      return "";
  }
}
