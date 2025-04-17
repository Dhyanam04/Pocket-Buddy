import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const List = () => {

  const [list, setList] = useState([]);
  const url = `http://localhost:8000`;
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);

    if (response.data.sucess) {
      setList(response.data.data)
      // toast.success("ok data got")
    }
    else {
      toast.error("Error");
    }
  }
  
  const removefood = async (itmid)=>{
    // console.log(itmid); 
    const response = await axios.post(`${url}/api/food/remove` , {id:itmid})
    await fetchList();

      if (response.data.success) {
        toast.success(response.data.message)
      }
      else {
        toast.error("Error");
      }
  }
  

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((itm,idx)=>{
            return (
              <div key={idx} className='list-table-format'>
                <img src={`${url}/images/`+itm.image} alt="" />
                <p>{itm.name}</p>
                <p>{itm.category}</p>
                <p>{itm.price}</p>
                <p onClick={()=>{removefood(itm._id)}} className='cursor'>X</p>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default List