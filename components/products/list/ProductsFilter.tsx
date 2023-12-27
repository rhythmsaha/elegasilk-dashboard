import { Selection } from '@nextui-org/react';
import TableSearch from '@/components/ui/table/TableSearch';
import PublishFilter from './PublishFilter';
import StocksFilter from './StocksFilter';

interface Props {
    searchState: string;
    selectedStatus: Selection;
    selectedStock: Selection;

    onSeachChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedStatus: React.Dispatch<React.SetStateAction<Selection>>;
    setSelectedStock: React.Dispatch<React.SetStateAction<Selection>>;
}

const ProductsFilter: React.FC<Props> = ({ searchState, selectedStatus, selectedStock, onSeachChange, setSelectedStatus, setSelectedStock }) => {
    return (
        <div className="grid w-full gap-x-4 gap-y-2 lg:grid-cols-12">
            <div className="w-full flex-grow md:w-auto lg:col-span-8">
                <TableSearch searchState={searchState} onChange={onSeachChange} />
            </div>

            <div className="grid w-full grid-cols-2 items-center justify-between gap-2 lg:col-span-4">
                <PublishFilter selectedPublish={selectedStatus} setSelectedPublish={setSelectedStatus} />
                <StocksFilter selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
            </div>
        </div>
    );
};

export default ProductsFilter;
