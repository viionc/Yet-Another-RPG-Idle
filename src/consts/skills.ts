import { Element } from './enums/element.enum'

export const elementTypeToString: Record<Element, string> = {
  [Element.air]: 'Air',
  [Element.dark]: 'Dark',
  [Element.earth]: 'Earth',
  [Element.fire]: 'Fire',
  [Element.light]: 'Light',
  [Element.physical]: 'Physical',
  [Element.water]: 'Water',
}
