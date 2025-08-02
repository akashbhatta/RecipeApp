// CategoryPage.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CategoryList() {
  const { name } = useParams()
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
          params: {
            apiKey: 'f1631a96d679415092ca9ed85baa0138',
            type: name.toLowerCase() // breakfast, lunch, etc.
          }
        })
        setRecipes(res.data.results)
      } catch (err) {
        console.error('Error fetching recipes:', err)
      }
    }
    fetchRecipes()
  }, [name])

  return (
    <div>
      <h1>{name} Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  )
}
