import { SetMetadata } from '@nestjs/common';

export const SkipJwtGuard = () => SetMetadata('SKIP_JWT_GUARD', true);
