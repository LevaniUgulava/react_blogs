import { useEffect, useState } from 'react';
import './App.css';
import Product from './components/Product';
import { fetchData, handleMassDelete } from './helpers/helpers';

function App() {
  const [selectedIds, setSelectedIds] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData(setProducts);
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
                    {products && products?.map((product) => (
                        <Product key={product.id} product={product} setSelectedIds={setSelectedIds}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App;
