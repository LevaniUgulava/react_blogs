import { useEffect, useState } from 'react';
import './App.css';
import { fetchData, handleMassDelete, handleToggleSelect } from './helpers/helpers';

function App() {
  const [selectedIds, setSelectedIds] = useState([]);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/`);
          setProducts(response.data);
      } catch (error) {
          console.log(error);
      }
  };

    useEffect(() => {
      fetchData();
    }, []);
    

    return (
        <>
            <nav className="bg-gray-800 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                      Product List
                  <div>
                      <ul className="flex items-center space-x-4">
                          <li>
                          </li>
                          <button onClick={() => handleMassDelete(selectedIds,setSelectedIds,setProducts)} id="delete-product-btn" className="hover:text-gray-300 transition duration-150 ease-in-out">
                              MASS DELETE
                          </button>
                      </ul>
                  </div>
              </div>
            </nav>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.map((product) => (
                        <div className="col-span-1 relative" key={product.id}>
                        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                            <div className="p-5">
                                <div className=" flex justify-center ">
                                <div className="text-center">
                                         <p>{product.sku}</p>
                                        <p>{product.name}</p>
                                        <p>{product.price} $</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-5 top-4">
                            <input type="checkbox" className="delete-checkbox" onChange={() => handleToggleSelect(product.id,setSelectedIds)}/>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App;
