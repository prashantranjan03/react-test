import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GraphForm() {
    const [inputs, setInputs] = useState([{ type: '', description: '', prices: [{ price: '', date: '' }] }]);
    const navigate = useNavigate();

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        updatedInputs[index][name] = value;
        setInputs(updatedInputs);
    };

    const handlePriceChange = (parentIndex, childIndex, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...inputs];
        updatedInputs[parentIndex].prices[childIndex][name] = value;
        setInputs(updatedInputs);
    };

    const handleAddPrice = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].prices.push({ price: '', date: '' });
        setInputs(updatedInputs);
    };

    const handleRemovePrice = (parentIndex, childIndex) => {
        const updatedInputs = [...inputs];
        updatedInputs[parentIndex].prices.splice(childIndex, 1);
        setInputs(updatedInputs);
    };


    const handleRemoveInput = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    const handleAddChanges = () => {
        // Navigate to the new page and pass the data as state
        navigate('/line-bar', { state: { data: inputs } });
    };

    return (
        <>
            <div style={{ display: 'flex', margin: '10px' }}>
                <h4>Sales Tracking App</h4>
                <button type="button" onClick={handleAddChanges} style={{ marginLeft: 'auto', padding: '6px', backgroundColor: '#110251', color: 'white', borderRadius: 4, cursor: 'pointer' }}>Add Changes</button>
            </div>
            <div>
                {inputs.map((input, index) => (
                    <div key={index} style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', marginBottom: '30px', padding: 10 }}>
                            <input
                                type="text"
                                placeholder="Shop Name"
                                name="type"
                                value={input.type}
                                onChange={(event) => handleInputChange(index, event)}
                                style={{ marginRight: '5px', width: '50%' }}
                            />
                            <input
                                type="text"
                                placeholder="Shop Type"
                                name="description"
                                value={input.description}
                                onChange={(event) => handleInputChange(index, event)}
                                style={{ width: '50%' }}
                            />
                            {index > 0 && <button type="button" onClick={() => handleRemoveInput(index)}>Remove</button>}
                        </div>
                        {input.prices.map((price, priceIndex) => (
                            <div key={priceIndex} style={{ display: 'flex', padding: 10, marginRight:'20px' }}>
                                <input
                                    type="number"
                                    placeholder="Annual Sales in Rupees"
                                    name="price"
                                    value={price.price}
                                    onChange={(event) => handlePriceChange(index, priceIndex, event)}
                                    style={{ marginRight: '5px', width: '20%' }}
                                />
                                <input
                                    type="date"
                                    placeholder="Date"
                                    name="date"
                                    value={price.date}
                                    onChange={(event) => handlePriceChange(index, priceIndex, event)}
                                    style={{ marginRight: '5px', width: '20%' }}
                                />
                                 <input
                                    type="number"
                                    placeholder="Percentage of Male Customers"
                                    name="malePercentage"
                                    value={price.malePercentage}
                                    onChange={(event) => handlePriceChange(index, priceIndex, event)}
                                    style={{ marginRight: '5px', width: '30%' }}
                                />
                                {priceIndex === input.prices.length - 1 && <button type="button" onClick={() => handleAddPrice(index)}>Add</button>}
                                {priceIndex > 0 && <button type="button" onClick={() => handleRemovePrice(index, priceIndex)}>Remove</button>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default GraphForm;
