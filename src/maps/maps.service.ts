import { Client } from '@googlemaps/google-maps-services-js';
import { placeDetails } from '@googlemaps/google-maps-services-js/dist/places/details';
import { placesNearby as googlePlacesNearby } from '@googlemaps/google-maps-services-js/dist/places/placesnearby';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService {
  client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      config: {},
    });
  }

  async fetchPlaceDetails(placeName: string) {
    const {
      status,
      data: { results },
    } = await this.client.geocode({
      params: {
        address: placeName,
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    if (status !== HttpStatus.OK || results.length <= 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Place not found',
      };
    }

    const place = results[0];
    const placeLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.formatted_address,
    )}`;

    const placeAddress = place.formatted_address;
    const location = place.geometry.location;

    const {
      data: { result: placeInfo },
    } = await placeDetails({
      params: {
        place_id: place.place_id,
        fields: ['name', 'photos', 'rating'],
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    const photoUrl = placeInfo.photos.length
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${
          placeInfo.photos[0].photo_reference
        }&key=${this.configService.get('GOOGLE_MAPS_API_KEY')}`
      : 'https://picsum.photos/300/200';

    const {
      data: { results: placesNearby },
    } = await googlePlacesNearby({
      params: {
        location: location,
        radius: 5000, // Set the radius parameter to 5000 meters (5 kilometers)
        type: 'lodging',
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
      timeout: 1000,
    });

    const hotels = [];

    if (placesNearby.length) {
      for (let i = 0; i < Math.min(10, placesNearby.length); i++) {
        const hotel = placesNearby[i];
        const name = hotel.name;
        const rating = hotel.rating ? hotel.rating : 'N/A';
        const placeId = hotel.place_id;
        const photoURL = hotel.photos?.length
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${
              hotel.photos[0].photo_reference
            }&key=${this.configService.get('GOOGLE_MAPS_API_KEY')}`
          : 'https://picsum.photos/300/200';

        const hotelData = {
          name,
          rating,
          placeId,
          photoURL,
        };

        hotels.push(hotelData);
      }
    }

    return {
      status: HttpStatus.OK,
      data: {
        placeLink,
        placeAddress,
        location,
        photoUrl,
        hotels,
      },
    };
  }
}
