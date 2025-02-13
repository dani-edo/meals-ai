import { Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "./components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { MEALS } from "./data/meals";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMeals = MEALS.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.dsc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for meals, restaurants, or locations..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <Card
            key={meal.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square relative">
              <img
                src={meal.img}
                alt={meal.name}
                className="object-cover w-full h-full"
              />
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{meal.name}</CardTitle>
                <Badge variant="secondary">{meal.country}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 mb-4">{meal.dsc}</p>
              <StarRating rating={meal.rate} />
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <span className="text-xl font-bold">
                ${meal.price.toFixed(2)}
              </span>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                Order Now
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredMeals.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No meals found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
