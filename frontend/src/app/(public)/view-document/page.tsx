import Loader from '@/components/Loader'
import PageWrapper from '@/components/PageWrapper'
import DocumentViewer from '@/components/view-document/DocumentViewer'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <DocumentViewer />
    </Suspense>
  )
}

export default page;