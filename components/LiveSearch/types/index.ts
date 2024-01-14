export interface ResponseResult {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  area: number;
  borders: string[];
  callingCodes: string[];
  capital: string;
  cioc: string;
  currencies: [];
  demonym: string;
  flag: string;
  flags: { svg: string; png: string };
  independent: boolean;
  languages: [];
  latlng: number[];
  name: string;
  nativeName: string;
  numericCode: string;
  population: number;
  region: string;
  regionalBlocs: [];
  subregion: string;
  timezones: Date[];
  topLevelDomain: string[];
  translations: object;
}
