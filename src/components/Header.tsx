import { ChefHat } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-3 gradient-hero rounded-xl shadow-red">
            <ChefHat className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary-dark bg-clip-text text-transparent">
            iCook
          </h1>
        </div>
        <p className="text-center text-xl text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered recipe companion. Discover, create, and cook amazing meals with personalized recipes generated just for you.
        </p>
      </div>
    </header>
  );
}