import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiService {
  getData(): string {
    return 'Hello World!';
  }
}
