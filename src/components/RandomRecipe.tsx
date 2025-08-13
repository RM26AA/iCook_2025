import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dice6, Clock, ChefHat, Copy, Download, Coffee, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
}

const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast", icon: Coffee },
  { value: "lunch", label: "Lunch", icon: Sun },
  { value: "dinner", label: "Dinner", icon: Moon },
];

const CUISINES = [
  "Chinese", "Indian", "Italian", "Mexican", "Japanese", "French", "Thai", "Spanish",
  "American", "British", "Greek", "Turkish", "Lebanese", "Korean", "Vietnamese",
  "Moroccan", "Brazilian", "German", "Russian", "Ethiopian", "Jamaican", "Caribbean"
];

export function RandomRecipe() {
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateRandomRecipe = async () => {
    if (!mealType || !cuisine) {
      toast({
        title: "Please select meal type and cuisine",
        description: "Choose both meal type and cuisine to get a random recipe.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": "AIzaSyCnFzXmB8DPl-yrJ9sGHv0eD49SIdc3y10",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Please provide a random ${cuisine} ${mealType} recipe. Make it authentic to the cuisine and appropriate for ${mealType}. Include:
                    1. A brief description of the dish
                    2. Preparation time
                    3. Cooking time
                    4. List of ingredients with quantities
                    5. Step-by-step cooking instructions
                    
                    Format your response as JSON with this structure:
                    {
                      "title": "Dish Name",
                      "description": "Brief description",
                      "prepTime": "X minutes",
                      "cookTime": "X minutes", 
                      "ingredients": ["ingredient 1", "ingredient 2"],
                      "instructions": ["step 1", "step 2"]
                    }`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const recipeData = JSON.parse(jsonMatch[0]);
        setRecipe(recipeData);
        toast({
          title: "Random recipe generated!",
          description: `Here's a delicious ${cuisine} ${mealType}: ${recipeData.title}`,
        });
      } else {
        throw new Error("Could not parse recipe data");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Failed to generate recipe",
        description: "Please try again with different selections.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyRecipe = () => {
    if (!recipe) return;
    
    const recipeText = `${recipe.title}

${recipe.description}

Prep Time: ${recipe.prepTime}
Cook Time: ${recipe.cookTime}

Ingredients:
${recipe.ingredients.map(ing => `• ${ing}`).join('\n')}

Instructions:
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join('\n')}`;

    navigator.clipboard.writeText(recipeText);
    toast({
      title: "Recipe copied!",
      description: "The recipe has been copied to your clipboard.",
    });
  };

  const downloadRecipe = () => {
    if (!recipe) return;
    
    const recipeText = `${recipe.title}

${recipe.description}

Prep Time: ${recipe.prepTime}
Cook Time: ${recipe.cookTime}

Ingredients:
${recipe.ingredients.map(ing => `• ${ing}`).join('\n')}

Instructions:
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join('\n')}`;

    const blob = new Blob([recipeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_recipe.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Recipe downloaded!",
      description: "The recipe file has been downloaded.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Dice6 className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Random Recipe Generator
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Discover new dishes based on your meal preferences
        </p>
      </div>

      <Card className="p-8 shadow-medium">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Meal Type</label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose meal type" />
                </SelectTrigger>
                <SelectContent>
                  {MEAL_TYPES.map((meal) => {
                    const Icon = meal.icon;
                    return (
                      <SelectItem key={meal.value} value={meal.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {meal.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Cuisine</label>
              <Select value={cuisine} onValueChange={setCuisine}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {CUISINES.map((cuisineType) => (
                    <SelectItem key={cuisineType} value={cuisineType}>
                      {cuisineType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={generateRandomRecipe}
              disabled={loading}
              size="lg"
              variant="cook"
              className="px-12"
            >
              {loading ? (
                <>
                  <ChefHat className="mr-2 h-5 w-5 animate-spin" />
                  Cooking...
                </>
              ) : (
                <>
                  <Dice6 className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {recipe && (
        <Card className="p-8 shadow-medium recipe-card animate-fade-in">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">{recipe.title}</h3>
                <p className="text-muted-foreground text-lg">{recipe.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyRecipe}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadRecipe}>
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prep Time</p>
                      <p className="font-semibold">{recipe.prepTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cook Time</p>
                      <p className="font-semibold">{recipe.cookTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Ingredients</h4>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="flex-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}