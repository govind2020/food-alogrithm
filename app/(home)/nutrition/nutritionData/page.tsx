'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const dietInfo = [
  {
    id: 'vegetarian',
    food: [
      'Eggs: A common source of protein for lacto-ovo-vegetarians.',
      'Dairy Products: Including milk, cheese, and yogurt, often consumed by lacto-vegetarians.',
      'Legumes: Such as lentils, chickpeas, and black beans, which are rich in protein and fiber.',
      'Tofu: A versatile source of protein made from soybeans.',
      'Quinoa: A complete protein and a good source of fiber and various nutrients.',
      'Nuts and Seeds: Including almonds, walnuts, chia seeds, and flaxseeds, which provide healthy fats and protein.',
      'Fruits and Vegetables: A wide variety of fresh produce, providing essential vitamins, minerals, and antioxidants.',
      'Whole Grains: Such as brown rice, oats, and barley, offering fiber and nutrients.',
      'Plant-Based Oils: Like olive oil and coconut oil, used for cooking and dressings.',
      'Plant-Based Milk: Including almond milk, soy milk, and oat milk, as alternatives to dairy milk.',
    ],
  },
  {
    id: 'vegan',
    food: [
      'Avocados: A rich source of healthy fats and various nutrients.',
      'Coconut Oil: Used for cooking and baking in place of animal-based fats.',
      'Nuts and Nut Butters: Providing protein, healthy fats, and essential nutrients.',
      'Seeds: Such as chia seeds, flaxseeds, and hemp seeds, offering protein and omega-3 fatty acids.',
      'Non-Dairy Yogurt: Made from coconut, almond, or soy milk, as a dairy-free alternative.',
      'Nutritional Yeast: Often used to add a cheesy flavor to dishes and as a source of vitamin B12.',
      'Tempeh: A fermented soy product, rich in protein and probiotics.',
      'Plant-Based Protein Powders: Derived from sources like pea, hemp, or rice, for smoothies and shakes.',
      'Whole Grains: Including quinoa, brown rice, and whole wheat, for fiber and nutrients.',
      'Fruits and Vegetables: A diverse range of fresh produce for essential nutrients and antioxidants.',
    ],
  },
  {
    id: 'omnivore',
    food: [
      'Lean Meats: Such as chicken breast, turkey, and lean cuts of beef or pork.',
      'Fish and Seafood: Including salmon, tuna, shrimp, and mussels, for omega-3 fatty acids and protein.',
      'Eggs: A versatile source of protein and nutrients.',
      'Dairy Products: Such as milk, cheese, and yogurt, providing calcium and protein.',
      'Whole Grains: Including whole wheat bread, brown rice, and quinoa, for fiber and nutrients.',
      'Fruits and Vegetables: A wide variety of fresh produce for essential vitamins, minerals, and antioxidants.',
      'Nuts and Seeds: Providing healthy fats, protein, and essential nutrients.',
      'Legumes: Such as lentils, black beans, and chickpeas, for plant-based protein and fiber.',
      'Healthy Oils: Like olive oil and avocado oil, for cooking and dressings.',
      'Herbs and Spices: Used to enhance flavor and add variety to dishes.',
    ],
  },
];

function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [dietDetails, setDietDetails] = useState('');
  const search = searchParams.get('id');

  useEffect(() => {
    const url = 'https://meta-fir-json-server.onrender.com/nutrition';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((result) => {
        const filteredData = result.find((item: any) => item.id === search);
        setData(filteredData);
        setDietDetails(filteredData.current_diet);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [search]);

  const diet = dietInfo.find((d) => d.id === dietDetails);
  console.log('diet==>', diet)
  return (
    <div>
      <div className="px-6 xl:w-3/4 mx-auto py-10 flex flex-col gap-20 text-md">
        <div className="flex flex-col gap-20">
          {/* overview  */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-3xl lg:text-4xl flex-shrink-0">
              Hi
              {data?.name}
              Your General Overview
            </h2>
            <span className="text-neutral-400 text-sm font-normal">
              A general overview on the Nutertion plan and current health Diet
              Food
            </span>
          </div>
          {/* number of snacks  */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl lg:text-4xl flex-shrink-0">
              Eating Weekly outside Food
            </h3>
            {data?.eating_out > 2 ? (
              <h2 className="text-black text-sm font-normal">
                Your Number of Eating Outside is
                {data?.eating_out}
                is more than
                2, You should Eat less Outside
              </h2>
            ) : (
              <h2 className="text-black text-sm font-normal">
                Your Number of Eating Outside is
                {data?.eating_out}
                is less than
                2, You can Enjoy Eating Outside
              </h2>
            )}
          </div>
          {/* water quantity  */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-3xl lg:text-4xl flex-shrink-0">
              Your Daily Water Intake
            </h3>
            {data?.water_drinking > 5 ? (
              <h2 className="text-green-700 text-sm font-normal">
                Your Water Intake is
                {data?.water_drinking}
                is more than 5, You
                should Drink Daily Litter
              </h2>
            ) : (
              <h2 className="text-red-500 text-sm font-normal">
                Your Water Intake is
                {data?.water_drinking}
                is less than 7, You
                should Drink 7 Litter Daily
              </h2>
            )}
          </div>
          {/* diet type  */}
          <div>
            {data ? (
              <div>
                <h2 className="font-bold text-3xl lg:text-4xl flex-shrink-0 mb-5">
                  Diet Type:
                  {data.current_diet}
                </h2>
                <h3 className="text-xl font-semibold">
                  This Meal should be in your Diet Every Week
                </h3>
                <p className="text-neutral-400 text-sm font-normal mb-2">
                  Since your goal is to build muscles and stay Fit , high protein intake is
                  an important factor to build lean muscle
                  mass
                </p>
                <ul className="text-black text-sm font-normal">
                  {diet
                    // eslint-disable-next-line react/no-array-index-key
                    && diet.food.map((item, index) => <li className="mb-2" key={index}>{item}</li>)}
                </ul>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Page;
