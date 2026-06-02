import { Input } from '../ui/input';

interface Props {
    setSearchFilter: (val: string) => void;
    setCurrPage: (val: number) => void;
}

const SearchByDocumentName = ({ setCurrPage, setSearchFilter }: Props) => {
    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-foreground'>Search By Docuemnt Name</div>
            <Input
                onChange={(e) => {
                    setCurrPage(1)
                    setSearchFilter(e.target.value)
                }}
                className='w-[19vw] bg-card! text-card-foreground hover:bg-card-hover border-2'
                placeholder='Enter Document Name...'
            />
        </div>
    )
}

export default SearchByDocumentName;
