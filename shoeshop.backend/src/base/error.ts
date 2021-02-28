export class ErrorHelper {
  public BadRequestException(msg: string) {
    throw new Error(msg);
  }
  public UnauthorizedException(msg: string) {
    throw new Error(msg);
  }
  public NotFoundException(msg: string) {
    throw new Error(msg);
  }
  public ForbiddenException(msg: string) {
    throw new Error(msg);
  }
  public InternalServerErrorException(msg: string) {
    throw new Error(msg);
  }
}

export default new ErrorHelper();
