import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { ScheduleTripDto } from '../trips/dto/schedule-trip.dto';

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

  async fetchScheduleFromPrompt(
    scheduleTripDto: ScheduleTripDto,
  ): Promise<string> {
    const { city, startDate, endDate } = scheduleTripDto;
    const startDateString = new Date(startDate).toISOString().split('T')[0];
    const endDateString = new Date(endDate).toISOString().split('T')[0];

    try {
      // console.log('city', city);
      const completion = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a travel agent that helps users to plan their trip. Users will provide their destination place and start and end date for you to plan their trip. Don't add any prefix or suffix to your response. Generate your responses in markdown format, with proper heading and tables. \n """`,
          },
          {
            role: 'user',
            content: `Create an Itinerary for a trip to a city mentioned below and the dates are also mentioned below. Make sure to include the most beautiful yet safe places I can explore. Include a moderate amount of things to do since I also want some time to relax. Also based on the trip you created, what will be the total expense of traveling around and just enjoying myself for just one person? Exclude hotel and flights. Finally create two different tables summarizing my final itinerary in detail, the entire budget, emergency numbers, customs, and safety. Keep the customs and safety brief \n """`,
          },
          {
            role: 'user',
            content: `City: ${city}. From ${startDateString} to ${endDateString}. \n"""`,
          },
        ],
      });

      const completionRole = completion.data.choices[0].message.role;
      const completionText = completion.data.choices[0].message.content;

      if (completionRole == 'assistant') {
        return completionText;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
