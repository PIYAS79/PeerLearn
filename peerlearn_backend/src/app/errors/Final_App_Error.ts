class Final_App_Error extends Error {
  public status_code: number;
  constructor(status_code: number, message: string, stack = "") {
    super(message), 
    this.status_code = status_code;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default Final_App_Error;