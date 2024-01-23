export type MockServerData = {
    user: {
      names: string[];
      avatarUrls: string[];
      typeUsers: string[];
    };
    rentalOffer: {
      titles: string[];
      descriptions: string[];
      nameCitys: string[];
      previewImage: string[];
      images: string[];
      housingTypes: string[];
      comfortsList: string[];
      location: {
          name: string;
          latitude: number;
          longitude: number;
      }[];
    };
};
