import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async getData(): Promise<string> {
    try {
      // const completion = await this.openai.createChatCompletion({
      //   model: 'gpt-3.5-turbo',
      //   messages: [
      //     {
      //       content:
      //         'You are a travel agent. BThe user is describing the kind of place they will like to go and visit. They may or may not have a specific place in mind. Generate a list of comma separated keywords that can be fed into Google Maps places APIs to retrieve the data that they need',
      //       role: 'system',
      //     },
      //     {
      //       content: 'I am looking for a place to go visit. ',
      //       role: 'user',
      //     },
      //   ],
      // });
      // return completion.data.choices[0].text;
      return 'explore';
    } catch (e) {
      console.log(e);
    }
  }
}
