import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets/frontend_assets/assets.js'

const ExploreMenu = ({category , setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
        <h1>Explore our Menu</h1>
        <p className="explore-menu-text">Choose from a diverse menu featuring some of the most delecious dishes ever prepared by our michellin star rated chefs XD </p>
        <div className="explore-menu-list">
            {menu_list.map((itm, idx)=>{
                return (
                    <div onClick={()=>setCategory((prev)=>prev===itm.menu_name?"all": itm.menu_name)} key={idx} className='explore-menu-list-item'>
                        <img className={category===itm.menu_name?"active":""} src={itm.menu_image} alt = "" />
                        <p>{itm.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu