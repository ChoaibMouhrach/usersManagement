import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ReactPaginate from "react-paginate";

export default function Pagination({ handlePageChange, pageCount, forcePage }: { forcePage?: number; pageCount: number; handlePageChange: (event: { selected: number }) => void }) {
    return (
        <ReactPaginate
            onPageChange={handlePageChange}
            nextLabel={<MdNavigateNext />}
            containerClassName="flex items-center gap-2 p-2"
            pageLinkClassName="hover:bg-white hover:border-purple transition duration-300 hover:text-purple border-2 border-transparent bg-purple w-8 h-8 block flex justify-center rounded-sm text-white font-semibold items-center"
            activeLinkClassName="text-purple bg-white"
            nextLinkClassName="hover:bg-white hover:border-purple transition duration-300 hover:text-purple border-2 border-transparent bg-purple w-8 h-8 block flex justify-center rounded-sm text-white font-semibold items-center"
            previousLinkClassName="hover:bg-white hover:border-purple transition duration-300 hover:text-purple border-2 border-transparent bg-purple w-8 h-8 block flex justify-center rounded-sm text-white font-semibold items-center"
            pageCount={pageCount}
            forcePage={forcePage ? forcePage - 1 : 0}
            previousLabel={<MdNavigateBefore />}
        />
    );
}
