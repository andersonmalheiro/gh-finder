import { OpenStreetMapProvider } from 'leaflet-geosearch';

export class MapService {
  private mapProvider = new OpenStreetMapProvider();

  public async fetchMapBox(place: string) {
    try {
      const res = await this.mapProvider.search({ query: place });
      if (res) {
        return res;
      }
    } catch (error) {
      return error;
    }

    return undefined;
  }
}
