export const measurementUnits = [
  { key: 'Pieces', value: 'Штуки', shorten: 'шт.' },
  { key: 'Meters', value: 'Метри', shorten: 'м' },
  { key: 'Centimeters', value: 'Сантиметри', shorten: 'см' },
  { key: 'SquareMeters', value: 'Квадратні метри', shorten: 'м2' },
  { key: 'Tonnes', value: 'Тонни', shorten: 'т' },
  { key: 'Kilograms', value: 'Кілограми', shorten: 'кг' },
  { key: 'Grams', value: 'Грами', shorten: 'г' },
  { key: 'Liters', value: 'Літри', shorten: 'л' },
  { key: 'Milliliters', value: 'Мілілітри', shorten: 'мл' },
];

export const getShortenMeasurementUnit = (title: string) => {
  return measurementUnits.find(mu => mu.key === title).shorten;
};
