export class ErrorHelper {
  public BadRequestException(msg: string): ErrorConstructor {
    throw new Error(msg);
  }
  public UnauthorizedException(msg: string): ErrorConstructor {
    throw new Error(msg);
  }
  public NotFoundException(msg: string): ErrorConstructor {
    throw new Error(msg);
  }
  public ForbiddenException(msg: string): ErrorConstructor {
    throw new Error(msg);
  }
  public InternalServerErrorException(msg: string): ErrorConstructor {
    throw new Error(msg);
  }
}

export default new ErrorHelper();
