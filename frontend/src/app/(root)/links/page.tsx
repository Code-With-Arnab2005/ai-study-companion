import { AddLinkButton } from '@/components/links/AddLinkButton'
import LinksComponent from '@/components/links/LinksComponent'
import LinksGrid from '@/components/links/LinksGrid'
import LinkHeader from '@/components/links/LinksHeader'
import PageWrapper from '@/components/PageWrapper'
import React from 'react'

const page = () => {
  return (
    <PageWrapper>
        <LinksComponent />
    </PageWrapper>
  )
}

export default page
