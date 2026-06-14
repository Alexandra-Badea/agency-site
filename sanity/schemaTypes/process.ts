import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'process',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'num',
      title: 'Step number (e.g. "01")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step title (e.g. "Discovery")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. "1–2 Weeks")',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Order (for sorting)',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Step order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
