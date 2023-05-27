import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';

@Injectable()
export class MapsService {
  client: Client;

  constructor() {
    this.client = new Client({
      config: {},
    });
  }

  async fetchPlaceDetails(placeName: string) {}
}
