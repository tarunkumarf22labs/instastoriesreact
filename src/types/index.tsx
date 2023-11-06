export  interface Ival {
    productid: number;
    id: string,
    image: string,
    largeimg : string,
    name: string,
    nextid ?: number,
    count : number
    childstories: o[]
  }

  interface o {
    id:  string;
    storiescontnet:string;
    productid: number
  }
// product type 

export interface shopify {
    __typename:       string;
    id:               shopifyID;
    availableForSale: boolean;
    createdAt:        Date;
    updatedAt:        Date;
    descriptionHtml:  string;
    description:      string;
    handle:           string;
    productType:      string;
    title:            string;
    vendor:           string;
    publishedAt:      Date;
    onlineStoreUrl:   null;
    options:          Option[];
    images:           ImageElement[];
    variants:         Variant[];
    type:             shopifyType;
}

export enum shopifyID {
    GidShopifyProduct7624057815199 = "gid://shopify/Product/7624057815199",
}

export interface ImageElement {
    id:              string;
    src:             string;
    altText:         null;
    width:           number;
    height:          number;
    type:            ImageType;
    hasNextPage:     boolean | HasNextPageClass;
    hasPreviousPage: boolean | HasNextPageClass;
    variableValues:  VariableValues;
}

export interface HasNextPageClass {
    value: boolean;
}

export interface ImageType {
    name:           ImageEnum;
    kind:           Kind;
    fieldBaseTypes: PurpleFieldBaseTypes;
    implementsNode: boolean;
}

export interface PurpleFieldBaseTypes {
    altText: Description;
    height:  Height;
    id:      FieldBaseTypesID;
    url:     URL;
    width:   Height;
}

export enum Description {
    String = "String",
}

export enum Height {
    Int = "Int",
}

export enum FieldBaseTypesID {
    ID = "ID",
}

export enum URL {
    URL = "URL",
}

export enum Kind {
    Object = "OBJECT",
}

export enum ImageEnum {
    Image = "Image",
}

export interface VariableValues {
    id: shopifyID;
}

export interface Option {
    id:     string;
    name:   string;
    values: Value[];
    type:   OptionType;
}

export interface OptionType {
    name:           string;
    kind:           Kind;
    fieldBaseTypes: FluffyFieldBaseTypes;
    implementsNode: boolean;
}

export interface FluffyFieldBaseTypes {
    name:   Description;
    values: Description;
}

export interface Value {
    value: string;
    type:  ValueType;
}

export interface ValueType {
    name: Description;
    kind: string;
}

export interface shopifyType {
    name:           string;
    kind:           Kind;
    fieldBaseTypes: TentacledFieldBaseTypes;
    implementsNode: boolean;
}

export interface TentacledFieldBaseTypes {
    availableForSale: string;
    createdAt:        string;
    description:      Description;
    descriptionHtml:  string;
    handle:           Description;
    id:               FieldBaseTypesID;
    images:           string;
    onlineStoreUrl:   URL;
    options:          string;
    productType:      Description;
    publishedAt:      string;
    title:            Description;
    updatedAt:        string;
    variants:         string;
    vendor:           Description;
}

export interface Variant {
    id:                   string;
    title:                string;
    price:                CompareAtPrice;
    priceV2:              CompareAtPrice;
    weight:               number;
    available:            boolean;
    sku:                  string;
    compareAtPrice:       CompareAtPrice;
    compareAtPriceV2:     CompareAtPrice;
    image:                VariantImage;
    selectedOptions:      SelectedOption[];
    unitPrice:            null;
    unitPriceMeasurement: UnitPriceMeasurement;
    type:                 VariantType;
    hasNextPage:          boolean | HasNextPageClass;
    hasPreviousPage:      boolean | HasNextPageClass;
    variableValues:       VariableValues;
}

export interface CompareAtPrice {
    amount:       string;
    currencyCode: CompareAtPriceCurrencyCode;
    type:         CompareAtPriceType;
}

export enum CompareAtPriceCurrencyCode {
    Inr = "INR",
}

export interface CompareAtPriceType {
    name:           CompareAtPriceEnum;
    kind:           Kind;
    fieldBaseTypes: StickyFieldBaseTypes;
    implementsNode: boolean;
}

export interface StickyFieldBaseTypes {
    amount:       Amount;
    currencyCode: FieldBaseTypesCurrencyCode;
}

export enum Amount {
    Decimal = "Decimal",
}

export enum FieldBaseTypesCurrencyCode {
    CurrencyCode = "CurrencyCode",
}

export enum CompareAtPriceEnum {
    MoneyV2 = "MoneyV2",
}

export interface VariantImage {
    id:      string;
    src:     string;
    altText: null;
    width:   number;
    height:  number;
    type:    ImageType;
}

export interface SelectedOption {
    name:  string;
    value: string;
    type:  SelectedOptionType;
}

export interface SelectedOptionType {
    name:           string;
    kind:           Kind;
    fieldBaseTypes: IndigoFieldBaseTypes;
    implementsNode: boolean;
}

export interface IndigoFieldBaseTypes {
    name:  Description;
    value: Description;
}

export interface VariantType {
    name:           string;
    kind:           Kind;
    fieldBaseTypes: IndecentFieldBaseTypes;
    implementsNode: boolean;
}

export interface IndecentFieldBaseTypes {
    availableForSale:     string;
    compareAtPrice:       CompareAtPriceEnum;
    id:                   FieldBaseTypesID;
    image:                ImageEnum;
    price:                CompareAtPriceEnum;
    product:              string;
    selectedOptions:      string;
    sku:                  Description;
    title:                Description;
    unitPrice:            CompareAtPriceEnum;
    unitPriceMeasurement: string;
    weight:               string;
}

export interface UnitPriceMeasurement {
    measuredType:   null;
    quantityUnit:   null;
    quantityValue:  number;
    referenceUnit:  null;
    referenceValue: number;
    type:           UnitPriceMeasurementType;
}

export interface UnitPriceMeasurementType {
    name:           string;
    kind:           Kind;
    fieldBaseTypes: HilariousFieldBaseTypes;
    implementsNode: boolean;
}

export interface HilariousFieldBaseTypes {
    measuredType:   string;
    quantityUnit:   string;
    quantityValue:  string;
    referenceUnit:  string;
    referenceValue: Height;
}


export interface Iloaction {
 id : string ,
 count : number
}

