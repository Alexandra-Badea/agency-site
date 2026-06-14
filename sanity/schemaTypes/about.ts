import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading lines',
      description: 'Each line of the large heading (e.g. "WE\'RE A STUDIO", "OBSESSED WITH", "REMARKABLE WORK.")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'paragraphs',
      title: 'Body paragraphs',
      description: 'The two descriptive paragraphs under the heading',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'availabilityHeading',
      title: 'Availability card heading',
      type: 'string',
      initialValue: 'Open for 2026 Projects',
    }),
    defineField({
      name: 'availabilitySubtext',
      title: 'Availability card subtext',
      type: 'string',
      initialValue: 'We accept 6–8 client engagements per year. Reach out early.',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name',  title: 'Name',       type: 'string' }),
            defineField({ name: 'role',  title: 'Role',       type: 'string' }),
            defineField({ name: 'since', title: 'Year joined (e.g. 2025)', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats (right column)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})
