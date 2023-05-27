import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
    this.openai = new OpenAIApi(configuration);
  }

  async fetchPlacesFromPrompt(text: string): Promise<string[]> {
    try {
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            content:
              "You are a travel agent. The user is describing the kind of place they will like to go and visit. They may or may not have a specific place in mind. Generate a list of 5 names of specific places like Bali, Indonesia or Kaziranga, Assam India separated by a |, that can be fed into Google Maps places APIs to retrieve the data that they need. Don't add any prefix or suffix to your response.",
            role: 'system',
          },
          {
            content:
              'I am looking for a place to go visit. Here is what I have in mind: \n """',
            role: 'user',
          },
          {
            content: text + '. \n"""',
            role: 'user',
          },
        ],
      });
      const completionRole = completion.data.choices[0].message.role;
      const completionText = completion.data.choices[0].message.content;

      if (completionRole == 'assistant') {
        return completionText.split('|');
      }
    } catch (e) {
      console.log(e);
    }
  }
}
