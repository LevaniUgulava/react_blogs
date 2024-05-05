import { handleToggleSelect } from "../helpers/helpers";


const Product = ({ product, setSelectedIds } ) => {
    const renderProductDetails = () => {
        switch (product.type) {
            case 'DVD':
                return <p>Size: {product.size} MB</p>;
            case 'Book':
                return <p >Weight: {product.weight} KG</p>;
            case 'Furniture':
                return (
                    <>
                        <p>Dimension: {product.height}x{product.width}x{product.length} CM</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="col-span-1 relative" key={product.id}>
            <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="p-5">
                    <div className=" flex justify-center ">
                    <div className="text-center">
                             <p>{product.sku}</p>
                            <p>{product.name}</p>
                            <p>{product.price} $</p>
                            {renderProductDetails()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute left-5 top-4">
                <input type="checkbox" className="delete-checkbox" onChange={() => handleToggleSelect(product.id,setSelectedIds)}/>
            </div>
        </div>
    );
}



export default Product;