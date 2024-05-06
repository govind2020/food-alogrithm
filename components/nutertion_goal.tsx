"use client";

// imports
import Lottie from "lottie-react";
import fireAnimation from "@/animations/fire.json";
import strongAnimation from "@/animations/strong.json";
import { useState, useContext, useEffect } from "react";
import powerAnimation from "@/animations/power.json";
import healthAnimation from "@/animations/health.json";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { StepsContext } from "@/context/steps";
import bulkAnimation from "@/animations/bulk.json";
import recompositionAnimation from "@/animations/recomposition.json";
import robotAnimation from "@/animations/robot.json";
import CardComponent from "./card";
import Picker from "./picker";
import { Input } from "./ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NutritionGoalProps {
  title: string;
 
  description: string;
  id: string;
  answers: {
    current_diet: string;
    name: string;
    number_snacks: number;
    eating_out: number;
    water_drinking: number;
  };
}
const NutritionGoal: React.FC<NutritionGoalProps> = ({
  title,
  description,
  id,
  answers
}) => {
  const [myanswers, setMyAnswers] = useState(answers);
  const [newId, setNewId] = useState('');
  const router = useRouter(); 

  const updateAnswer = (field: keyof typeof myanswers, value: any) => {
    setMyAnswers((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const logAnswers = () => {
    fetch('https://meta-fir-json-server.onrender.com/nutrition', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myanswers)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Submitted Successfully:', data);
        setNewId(data?.id)
        router.push(`/nutrition/nutritionData?id=${data?.id}`);
    })
    .catch(error => {
        console.error('Failed to submit:', error);
        alert('Failed to submit data');
    });
  };

  return (
    <CardComponent title={title} description={description} >
      {/* Fitness goal */}
      <div className="flex flex-col space-y-3">
        <Label htmlFor="name" className="text-md lg:text-lg">
          Choose your Nutertion goal 🎯
        </Label>

        <div className="flex flex-col space-y-3">
          <Label htmlFor="name" className="text-md lg:text-lg">
            Name
            {' '}
            <span className="text-neutral-500 text-xs lg:text-md"></span>
          </Label>
          <Input
            defaultValue={answers?.name}
            onChange={(e) => updateAnswer('name', e.target.value)}
            id="name"
            placeholder="What's your name"
            className="py-6 lg:py-7 text-md lg:text-xl"
          />
        </div>

        <Label htmlFor="age" className="text-md lg:text-lg">
          Dietary Choices
        </Label>
        <RadioGroup
          defaultValue={myanswers?.current_diet}
          onValueChange={(value) => updateAnswer("current_diet", value)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"
        >
          {/* Vegetarian */}
          <div className="w-full col-span-1 h-full">
            <RadioGroupItem
              value="vegetarian"
              id="vegetarian"
              className="peer sr-only"
            />
            <Label
              htmlFor="vegetarian"
              className="flex cursor-pointer gap-2 h-full text-2xl lg:text-3xl font-black text-center flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Vegetarian
              <span className="text-neutral-400 text-sm text-center font-normal">
                One that does not include any meat or seafood.
              </span>
            </Label>
          </div>

          {/* Vegan */}
          <div className="w-full col-span-1 h-full">
            <RadioGroupItem value="vegan" id="vegan" className="peer sr-only" />
            <Label
              htmlFor="vegan"
              className="flex cursor-pointer gap-2 h-full text-2xl lg:text-3xl font-black text-center flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Vegan
              <span className="text-neutral-400 text-sm text-center font-normal">
                A vegan diet is based on plants (such as vegetables, grains,
                nuts and fruits) and foods made from plants
              </span>
            </Label>
          </div>

          {/* Omnivore */}
          <div className="w-full col-span-1 h-full">
            <RadioGroupItem
              value="omnivore"
              id="omnivore"
              className="peer sr-only"
            />
            <Label
              htmlFor="omnivore"
              className="flex h-full cursor-pointer gap-2 text-2xl lg:text-3xl font-black text-center flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Omnivore
              <span className="text-neutral-400 text-sm text-center font-normal">
                Omnivores eat both plants and animals, and can be mammals,
                birds, fish, reptiles, or even insects
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <br />

      {/* Number snacks */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="number_snacks" className="text-md lg:text-lg">
          What does a typical day of eating look like for you 🗓️ ?
        </Label>
        <Picker
          max={7}
          min={1}
          tag="Days per week"
          value={myanswers.number_snacks}
          onAdd={() =>
            updateAnswer("number_snacks", myanswers.number_snacks + 1)
          }
          onRemove={() =>
            updateAnswer(
              "number_snacks",
              Math.max(0, myanswers.number_snacks - 1)
            )
          }
          onSlide={(value) => updateAnswer("number_snacks", value)}
        />
      </div>

      {/* Eat Our  */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="eating_out" className="text-md lg:text-lg">
          How Often do you Eat Out 🗓️ ?
        </Label>
        <Picker
          max={7}
          min={0}
          tag="Days per week"
          value={myanswers.eating_out}
          onAdd={() => updateAnswer("eating_out", myanswers.eating_out + 1)}
          onRemove={() =>
            updateAnswer("eating_out", Math.max(0, myanswers.eating_out - 1))
          }
          onSlide={(value) => updateAnswer("eating_out", value)}
        />
      </div>

      {/* Drinking Water  */}
      <div className="flex flex-col space-y-2">
        <Label htmlFor="water_drinking" className="text-md lg:text-lg">
          How Much water do you Typically drink in a Day 🗓️ ?
        </Label>
        <Picker
          max={12}
          min={1}
          tag="Days per week"
          value={myanswers.water_drinking}
          onAdd={() =>
            updateAnswer("water_drinking", myanswers.water_drinking + 1)
          }
          onRemove={() =>
            updateAnswer(
              "water_drinking",
              Math.max(0, myanswers.water_drinking - 1)
            )
          }
          onSlide={(value) => updateAnswer("water_drinking", value)}
        />
      </div>

     
      <button
        onClick={logAnswers}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150"
      >
        Submit
      </button> 
    </CardComponent>
  );
};

export default NutritionGoal;
