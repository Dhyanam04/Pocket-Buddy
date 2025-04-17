import React, {useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((itm,idx)=>{
              if(category === "all" || category === itm.category){
                return <FoodItem key={idx} id={itm._id} name={itm.name} description={itm.description} price={itm.price} image={itm.image}/>
              }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay