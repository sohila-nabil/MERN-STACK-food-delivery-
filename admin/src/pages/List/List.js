import React, { useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";
function List() {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/foodList`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error(res.data.msg);
    }
  };

  const rmoveFoodItem = async (foodId) => {
    const res = await axios.post(`${url}/api/food/delete`, { id: foodId });
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.msg);
    } else {
      toast.error("error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="ie" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => rmoveFoodItem(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
