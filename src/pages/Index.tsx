import { Header } from "@/components/Header";
import { RecipeSearch } from "@/components/RecipeSearch";
import { RandomRecipe } from "@/components/RandomRecipe";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4">
        <Header />
        
        <div className="space-y-16 pb-16">
          {/* Recipe Search Section */}
          <section className="animate-slide-up">
            <RecipeSearch />
          </section>
          
          {/* Separator */}
          <div className="flex items-center justify-center">
            <Separator className="w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          
          {/* Random Recipe Section */}
          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <RandomRecipe />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
