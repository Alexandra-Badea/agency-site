import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import service from './service'
import caseStudy from './caseStudy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, service, caseStudy],
}
