import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



function App() {
  const [recipes, setRecipes] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('chicken')


  const APP_ID = '8f4eed8f'
  const APP_KEY = 'afcd694605397ea2086edd294b844d7c'

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=8f4eed8f&app_key=afcd694605397ea2086edd294b844d7c`)
      console.log(response.data.hits)
      setRecipes(response.data.hits)
    }
    catch (err) {
      console.error(err)
      setError(err)
    }
    finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchRecipes()
  }

  useEffect(() => {
    fetchRecipes()
  }, [])


  if (error) return <p>{error}</p>
  if (loading) return <p>Loading...</p>


  return (
    <>
      <h1>Recipes APP</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={e => setSearch(e.target.value)} />
        <input type="submit" />
      </form>
      {recipes.map(recipe => {
        return (
          <div key={recipe.recipe.uri}>
            <Card sx={{ maxWidth: 345, marginBottom: '15px' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={recipe.recipe.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.recipe.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        )
      })}

    </>
  )
}

export default App
