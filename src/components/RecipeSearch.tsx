import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Clock, ChefHat, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
}

export function RecipeSearch() {
  const [mealName, setMealName] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (!mealName.trim()) {
      toast({
        title: "Please enter a meal name",
        description: "Enter the name of a dish you'd like to cook.",
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
                    text: `Please provide a complete recipe for "${mealName}". Include:
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
          title: "Recipe ready!",
          description: `Found a delicious recipe for ${recipeData.title}`,
        });
      } else {
        throw new Error("Could not parse recipe data");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Failed to generate recipe",
        description: "Please try again with a different meal name.",
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
          <Search className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Recipe Search
          </h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Enter any meal name and get a complete recipe instantly
        </p>
      </div>

      <Card className="p-8 shadow-medium">
        <div className="flex gap-4">
          <Input
            placeholder="e.g. Fish and Chips, Pasta Carbonara, Chicken Curry..."
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateRecipe()}
            className="flex-1 h-12 text-lg"
          />
          <Button
            onClick={generateRecipe}
            disabled={loading}
            size="lg"
            variant="cook"
            className="px-8"
          >
            {loading ? (
              <>
                <ChefHat className="mr-2 h-5 w-5 animate-spin" />
                Cooking...
              </>
            ) : (
              <>
                <ChefHat className="mr-2 h-5 w-5" />
                Cook
              </>
            )}
          </Button>
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