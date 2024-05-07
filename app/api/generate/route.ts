/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

// imports
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request): Promise<any> {
  // get data from request
  let error: any = null;
  let result: any = {};
  await request
    .json()
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      error = err.toString();
    });

  // validate data
  if (error) {
    return NextResponse.json(
      {
        message: "Bad Request",
        error,
      },
      { status: 400 },
    );
  }
  if (typeof result !== "object") {
    return NextResponse.json(
      {
        message: "Bad request",
      },
      { status: 400 },
    );
  }

  // overview data
  const overview = {
    name: result.name,
    age: result.age,
    email: result.email,
    phone: result.phone,
    gender: result.gender,
    weight: result.weight,
    height: result.height,
    is_fat_accurate: result.is_fat_accurate === "yes",
    neck: result.neck || 22,
    waist: result.waist || 34,
    hip: result.hip || 33,
    body_type: result.body_type,
    fitness_goal: result.fitness_goal,
    workout_days: result.workout_days,
    activity: result.activity,
    crrent_diet: result.crrent_diet,
    food_alegric: result.food_alegric,
    number_snacks: result.number_snacks,
    eating_out: result.eating_out,
    water_drinking: result.water_drinking,
  };
  console.log('overview==>', overview)

  // save data to Json server
  const slug = result.name
    ? result.name + uuidv4().substring(0, 4)
    : uuidv4().substring(0, 5);
  const jsonServerUrl = "https://meta-fir-json-server.onrender.com/result";
  const jsonData = { slug, overview };
  fetch(jsonServerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Data uploaded to JSON server of result-->:", data))
    // eslint-disable-next-line @typescript-eslint/no-shadow
    .catch((error) => console.error("Error uploading data to JSON server:", error));
  return NextResponse.json({
    slug,
  });
}
