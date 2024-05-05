import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const validateForm = (formData) => {
    if (!formData.sku || !formData.name || !formData.price || !formData.type) {
        alert("Please fill all the required fields.");
        return false;
    }
    if (formData.type === "DVD" && !formData.details.size) {
        alert("Please provide the size for DVD.");
        return false;
    }
    if (formData.type === "Book" && !formData.details.weight) {
        alert("Please provide the weight for Book.");
        return false;
    }
    if (formData.type === "Furniture" && (!formData.details.height || !formData.details.width || !formData.details.length)) {
        alert("Please provide dimensions for Furniture.");
        return false;
    }

    return true;
};

export const fetchData = async (setProducts) => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        setProducts(response.data);
    } catch (error) {
        console.log(error);
    }
};

export const handleToggleSelect = (id,setSelectedIds) => {
    setSelectedIds(prev => {
        if (prev.includes(id)) {
            return prev.filter(item => item !== id);
        } else {
            return [...prev, Number(id)];
        }
    });
};

export  const handleMassDelete = async (selectedIds,setSelectedIds,setProducts) => {
    const data = { ids: selectedIds };
    if(selectedIds.length === 0){
        alert("you should check product to MASS DELETE!");
    }
    try {
        await axios.post(`${BASE_URL}/delete`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setSelectedIds([]);
        fetchData(setProducts);
    } catch (error) {
        console.log(error);
        
    }
  };

  export const handleProductCreate = async (formData, navigate) => {
    if(validateForm(formData)){
        try {
            await axios.post(`${BASE_URL}/addproduct`,formData,{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            navigate('/');
        } catch (error) {
            console.log(error);
            
        }
    }
};

export const handleFormChange = (e,setFormData) => {
    const { name, value } = e.target;
    if (name === "size" || name === "height" || name === "width" || name === "length" || name === "weight") {
        setFormData(prevState => ({
            ...prevState,
            details: {
                ...prevState.details,
                [name]: value
            }
        }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
};

export const handleProductCreationCancel = (setFormData,navigate) =>{
    setFormData({
        sku: "",
        name: "",
        price: "",
        type: "",
        details: {}
    })
}
