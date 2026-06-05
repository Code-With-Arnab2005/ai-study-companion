import { AddLinkButton } from '@/components/links/AddLinkButton'
import LinksGrid from '@/components/links/LinksGrid'
import LinkHeader from '@/components/links/LinksHeader'
import PageWrapper from '@/components/PageWrapper'
import React from 'react'

const page = () => {
  return (
    <PageWrapper>
        <div className="flex justify-between items-center mb-6">
            <LinkHeader />
            <AddLinkButton />
        </div>
        <LinksGrid />
    </PageWrapper>
  )
}

export default page
