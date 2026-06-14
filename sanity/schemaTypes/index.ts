import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import service from './service'
import caseStudy from './caseStudy'
import about from './about'
import process from './process'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, service, caseStudy, about, process],
}
