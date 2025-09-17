//* IMPORT

export type ResponseStoreData = {
  data: {
    records: StoreItem;
  };
};

export interface StoreItem {
  id: string;
  fields: StoreFields;
}

export interface StoreFields {
  long: number;
  lat: number;
  name: string;
  address: string;
  distance: number;
}

export interface InitialInterface {
  isLoading: boolean;
  store: StoreItem[];
  error: Error | null;
}

export type StoreData = StoreItem;
