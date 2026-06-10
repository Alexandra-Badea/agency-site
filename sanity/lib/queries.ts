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