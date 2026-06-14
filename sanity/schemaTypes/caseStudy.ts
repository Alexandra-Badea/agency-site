import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year (e.g. 2024)',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'First tag is shown in the card label (e.g. "Brand Identity", "Campaign")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      description: 'Shown on hover below the card image',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      description: 'Hex color used for the card label and hover wash (e.g. #c8ff00)',
      type: 'string',
      initialValue: '#c8ff00',
    }),
    defineField({
      name: 'size',
      title: 'Card size / aspect ratio',
      description: 'Controls the card shape in the asymmetric grid',
      type: 'string',
      options: {
        list: [
          { title: 'Large (4:3) — first slot',    value: 'large'   },
          { title: 'Portrait (3:4) — tall card',  value: 'portrait'},
          { title: 'Medium (4:3)',                 value: 'medium'  },
          { title: 'Wide (16:9)',                  value: 'wide'    },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'order',
      title: 'Display order (1–5)',
      description: 'Determines which grid slot this project fills (1 = large left, 2 = portrait right, 3–4 = small, 5 = wide)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image (optional — used instead of gradient placeholder)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
