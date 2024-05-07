import NutritionGoal from '@/components/nutertion_goal';

const nutritiondata = {
  id: '',
  icon: '🎯',
  title: 'Nutrition Goal 🎯',
  description:
    'A balanced diet refers to food that contains different nutrients and is in proper proportions.',
  component: null,
  answers: {
    current_diet: 'vegetarian',
    name: 'name',
    number_snacks: 2,
    eating_out: 2,
    water_drinking: 2,
  },
};
const page = () => (
  <div>
    <NutritionGoal
      title={nutritiondata?.title}
      description={nutritiondata?.description}
      id={nutritiondata?.id}
      answers={nutritiondata?.answers}
    />
  </div>
);

export default page;
