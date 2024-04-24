// imports
import type { stepType } from '@/types.h';

const steps_list: stepType[] = [
  {
    id: 'BasicInfoCard',
    icon: '📝',
    title: 'Personal Informations 📝',
    description: 'We need some basic informations from you to start',
    component: null,
    answers: {
      name: '',
      email: '',
      phone: '',
      age: 22,
      gender: 'M',
      height: 175,
      weight: 70,
      body_type: 'healthy',
      neck: 50,
      waist: 90,
      hip: 60,
      is_fat_accurate: null,
    },
  },
  {
    id: 'FitGoal',
    icon: '🏃',
    title: 'Fitness Goal 🏃',
    description: 'What do you want to achieve in your new fitness journey',
    component: null,
    answers: {
      fitness_goal: 'burn_fats',
      workout_days: 3,
      activity: '0',
    },
  },
  // {
  //   id: 'NutritionGoal',
  //   icon: '🎯',
  //   title: 'Nutrition Goal 🎯',
  //   description: 'A balanced diet refers to food that contains different nutrients and is in proper proportions.',
  //   component: null,
  //   answers: {
  //     crrent_diet: 'vegetarian',
  //     // food_alegric: '',
  //     number_snacks: '2',
  //     eating_out: '2',
  //     water_drinking: '2',
  //   },
  // },
];

export default steps_list;
