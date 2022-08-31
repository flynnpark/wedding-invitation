declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

interface Window {
  gtag: (command: string, ...commandParameters: any) => void;
  naver: {
    maps: {
      // latlng class
      LatLng: {
        new (lat: number, lng: number): {
          lat: number;
          lng: number;
        };
      };
      // map class
      Map: {
        new (
          elementId: string,
          options: {
            center: LatLng;
            zoom: number;
          }
        );
      };
      // marker class
      Marker: {
        new ({ position: LatLng, map: Map });
      };
    };
  };
}
