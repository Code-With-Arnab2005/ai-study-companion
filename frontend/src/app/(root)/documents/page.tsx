import DocumentHeader from '@/components/documents/DocumentHeader'
import DocumentsGrid from '@/components/documents/DocumentsGrid'
import PageWrapper from '@/components/PageWrapper'
import React from 'react'

const page = () => {
  return (
    <PageWrapper>
      <div>
        <DocumentHeader />
      </div>
      <DocumentsGrid />
    </PageWrapper>
  )
}

export default page
