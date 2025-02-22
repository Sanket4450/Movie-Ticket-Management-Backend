class AppError extends Error {
  public statusCode: number
  public stack?: any

  constructor(statusCode: number, message: string, stack?: any) {
    super(message)
    this.statusCode = statusCode
    this.stack = stack
  }
}

export default AppError
