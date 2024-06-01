import React, { useState, useEffect } from 'react';
import { Typography, TextField, Autocomplete } from '@mui/material';
import displayINRCurrency from '../helpers/displayCurrency';

const Pay = ({ products, totalPrice, totalQty }) => {
    const cities = ['Nablus', 'Tulkarm', 'Hebrew', 'Bet-lahem', 'Jeruselem', '48'];

    const [data, setData] = useState({
        mobile: null,
        city: "",
        detailedAddress: "",
        fN: '',
        lN: '',
        orderProductDetails: [],
        totalPrice: 0,
        totalQty: 0,
    });

    // Set initial state from props
    useEffect(() => {
        setData(prev => ({
            ...prev,
            orderProductDetails: products,
            totalPrice,
            totalQty
        }));
    }, [products, totalPrice, totalQty]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAutocompleteChange = (event, value) => {
        setData(prev => ({
            ...prev,
            city: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const apiCall = await fetch("http://localhost:8080/api/submit-order", {
            method: 'post',
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(apiCall);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className=' mx-auto flex justify-center '>
                    <Typography variant='h3'>Payment</Typography>
                </div>
                <h3 className='font-semibold mx-10'>Contact:</h3>
                <div className=' mt-5 gap-4 mx-10'>
                    <TextField required fullWidth label="Phone number" value={data.mobile || ''} name='mobile' onChange={handleChange} />
                </div>

                <h3 className='font-semibold mx-10 mt-5'>Delivery:</h3>

                <div className="flex gap-3 mt-5 mx-10">
                    <TextField fullWidth label="first name" value={data.fN} name='fN' onChange={handleChange} />
                    <TextField fullWidth label="last name" value={data.lN} name='lN' onChange={handleChange} />
                </div>
                <div className=' mt-5 gap-4 mx-10'>
                    <Autocomplete
                        options={cities}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label="Select City" 
                                variant="outlined"
                                required 
                            />
                        )}
                        value={data.city}
                        onChange={handleAutocompleteChange}
                    />
                </div>

                <h3 className='font-semibold mx-10 mt-5'>Address:</h3>
                <div className=' mt-5 gap-4 mx-10'>
                    <TextField required fullWidth label="Address" value={data.detailedAddress} name='detailedAddress' onChange={handleChange} />
                </div>
 
                <h3 className='font-semibold mx-10 mt-5'>Payment-type:</h3>
                <div className=' mt-5 gap-4 mx-10'>

                <TextField
                fullWidth
          label="Read Only"
          defaultValue="Cach On Delivery (COD)"
          InputProps={{
            readOnly: true,
          }}
        />
                </div>






                <div className='mx-10 mt-9'>
                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                        <p>Quantity</p>
                        <p>{totalQty}</p>
                    </div>

                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                        <p>Total Price</p>
                        <p>{displayINRCurrency(totalPrice)}</p>
                    </div>

                    <button className='bg-blue-600 p-2 text-white w-full mt-2' type='submit'>Submit Order</button>
                </div>
            </form>
        </>
    );
};

export default Pay;
