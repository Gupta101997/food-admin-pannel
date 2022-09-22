import React,{useState} from 'react'
import './AddFoodData.css'

import { db, storage } from './Firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { ref,uploadBytes, getDownloadURL } from 'firebase/storage'

const AddFoodData = () => {
  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState('')
  const [foodImage, setFoodImage] = useState(null)
  const [foodCategory, setFoodCategory] = useState('')
  const [foodDescription, setFoodDescription] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')
  const [foodImageurl, setFoodImageurl ] = useState(null)

// console.log(foodName,foodPrice,foodImage,foodCategory,foodDescription,
//               restaurantName,restaurantAddress,restaurantPhone)

      const handleSubmit = (e) =>{
          e.preventDefault()
          
          if(foodImage == null ){
            alert('Please  select  an image ')
            return
          }

          else{
            const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
            uploadBytes(imageRef, foodImage )
            .then(()=>{
              alert('image uploaded  successfully ')
              getDownloadURL(imageRef)
                 
              .then((url)=>{
                   // setFoodImageurl(url)

                     const foodData = {
                        foodName,
                        foodPrice,
                        foodImageurl:url,
                        foodCategory,
                        foodDescription,
                        restaurantName,
                        restaurantAddress,
                        restaurantPhone
                      }

                       console.log(foodData)
                                    try {
                                      const docRef = addDoc(collection(db, "foodData"),foodData); 
                                      alert("Data Added successfully",docRef.id);
                                    }
                                    catch (error){
                                      alert("Error adding documnet: ", error);
                                    }
                  }) 
            })
            .catch((error)=>{
              alert(error.message)
            })
          }
          
          
      }
  return (
    <div className='form-outer'>
      <h1>Add Food Data</h1>
      <form className='form-inner'>
        <label>Food Name</label>
        <input type="text" name='food_name'
          onChange={(e)=>{setFoodName(e.target.value)}}
        />
        <br/>
        <label>Food Description</label>
        <input type="text" name='food_description'
          onChange={(e)=>{setFoodDescription(e.target.value)}}
        />
        <br/>
        <label>Food Price</label>
        <input type="number" name='food_price'
          onChange={(e)=>{setFoodPrice(e.target.value)}}
        />
        <br/>
        <label>Food Category</label>
        <input type="text" name='food_category'
          onChange={(e)=>{setFoodCategory(e.target.value)}}
        />
        <br/>
        <label>Food Image </label>
        <input type="file" name='food_image'
          onChange={(e)=>{setFoodImage(e.target.files[0])}}
        />
        <br/>
        <label>Restaurant Name</label>
        <input type="text" name='restaurant_name'
          onChange={(e)=>{setRestaurantName(e.target.value)}}
        />
        <br/>
        <label>Restaurant Address</label>
        <input type="text" name='restaurant_address'
          onChange={(e)=>{setRestaurantAddress(e.target.value)}}
        />
        <br/>
        <label>Restaurant Phone</label>
        <input type="number" name='restaurant_phone'
          onChange={(e)=>{setRestaurantPhone(e.target.value)}}
        />
        <br/>
        <button onClick={handleSubmit}>Add food</button>
      </form>
    </div>
  )
}

export default AddFoodData
