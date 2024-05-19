import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';



import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)

    const handleDelete = async () => {
      try {
          const response = await fetch(SummaryApi.deleteProduct.url, {
              method: SummaryApi.deleteProduct.method,
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials : 'include',

              body: JSON.stringify({ productId: data._id }), // Pass productId in the body
          });

          if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(`Failed to delete the product: ${errorMessage}`);
          }

          const responseData = await response.json();
          toast.success(responseData.message);

          // Refresh the data after deletion
          fetchdata();
      } catch (error) {
          console.error('Error deleting product:', error);
          toast.error(`Failed to delete the product: ${error.message}`);
      }
  };

  return (
    <div className='bg-white p-4 rounded '>
       <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={handleDelete}>
                    <MdDelete/>

                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
    
    </div>
  )
}

export default AdminProductCard