import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from './importMap.js'
import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const generateMetadata = ({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) =>
  RootPage({ config, params, searchParams, importMap })

export default Page