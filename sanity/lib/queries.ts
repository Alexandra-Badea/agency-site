import { defineQuery } from 'next-sanity'

export const HERO_QUERY = defineQuery(
  `*[_type == "hero"][0]{
    headline,
    subheadline,
    ctaText,
    backgroundImage
  }`
)

export const SERVICES_QUERY = defineQuery(
  `*[_type == "service"]{
    _id,
    title,
    description,
    icon
  }`
)

export const CASE_STUDIES_QUERY = defineQuery(
  `*[_type == "caseStudy"]{
    _id,
    title,
    client,
    coverImage,
    tags,
    summary
  }`
)

export const ABOUT_QUERY = defineQuery(
  `*[_type == "about"][0]{
    heading,
    paragraphs,
    availabilityHeading,
    availabilitySubtext,
    teamMembers[]{
      name,
      role,
      since
    },
    stats[]{
      label,
      value
    }
  }`
)

export const PROCESS_QUERY = defineQuery(
  `*[_type == "process"] | order(order asc){
    _id,
    num,
    title,
    duration,
    description
  }`
)
