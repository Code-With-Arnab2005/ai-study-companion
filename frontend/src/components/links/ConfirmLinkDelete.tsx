import { Trash2 } from 'lucide-react'
import React from 'react'

const ConfirmLinkDelete = () => {
    return (
        <button
            // onClick={() => handleDelteFile(doc)}
            className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
            <Trash2 size={16} />
        </button>
    )
}

export default ConfirmLinkDelete
