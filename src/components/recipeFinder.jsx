import React,{ useState }  from 'react'
import useSWR from 'swr';
import axios from 'axios';

// Axios fetcher function
const fetcher = (url) => axios.get(url).then((res) => res.data);

function RecipeFinder() {
  const[clickedCategory, setClickedCategory] = useState(null);
  const[clickedImage, setClickedImage] = useState(null);
  const[clickedDescription, setClickedDescription] = useState(null);


  const { data, error, isLoading } = useSWR(
    'https://www.themealdb.com/api/json/v1/1/categories.php', fetcher
  );

if(isLoading) return <div>Loading...</div>
if(error) return <div>Error: {error.message}</div>

  const handleClick = (recipeName, recipeImage, recipeDescription) => {
    if(recipeImage && recipeDescription){
      setClickedCategory(recipeName);
      setClickedImage(recipeImage);
      setClickedDescription(recipeDescription);
    }
  };


  
    return (
      <div className='main'>
      <h1 className='recipeHead'>Recipe Finder</h1>
      <div className="recipes-list">
      <ul>{data.categories.map((categories) =>(
        <li key={categories.idCategory} onClick={()=> handleClick(categories.strCategory, categories.strCategoryThumb,categories.strCategoryDescription)}>
        {categories.strCategory} 
        </li>
      ))}
       {clickedCategory && (
        <div>
        <h2>{clickedCategory} </h2>
        <img 
        src = {clickedImage}
        alt={clickedCategory}/>
        <p>{clickedDescription}</p> 
        </div>
       )}
      </ul>
      </div>
      </div>
    );
}

export default RecipeFinder; 
 
