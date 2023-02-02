import type { AvgCalculation } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const Numbers = () => {
  const [newNumber, setNewNumber] = useState<string>("");
  const [calculations, setNewCalculations] = useState<AvgCalculation[]>([]);

  // tRPC
  const { data: calculationsHistory, refetch } =
    api.numbers.geCalculationsHistory.useQuery();
  const { mutateAsync: calculateAverageNumber } =
    api.numbers.calculateAverageNumber.useMutation();

  useEffect(() => {
    if (!calculationsHistory) return;
    setNewCalculations(calculationsHistory.reverse());
  }, [calculationsHistory]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await calculateAverageNumber(+newNumber);
    await refetch();
    setNewNumber("");
  };

  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/20 p-4 text-white md:w-3/4">
      <form onSubmit={void submitHandler}>
        <input
          type="number"
          placeholder="Your number"
          value={newNumber}
          onChange={(event) => setNewNumber(event.currentTarget.value)}
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
        />
        {/* Test task doesn't specified as to why add checkboxes and how to work with them */}
        <div className="my-2 flex justify-around rounded-xl bg-white/10 py-2  text-xl">
          <div>
            <label htmlFor="minus">Minus</label>
            <input
              type="checkbox"
              name="minus"
              id="minus"
              className="mx-2 h-6 w-6 rounded-md border-0 text-green-600 focus:ring-0"
            />
          </div>
          <div>
            <label htmlFor="point">Point</label>
            <input
              type="checkbox"
              name="point"
              id="point"
              className="mx-2 h-6 w-6 rounded-md border-0 text-green-600 focus:ring-0"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!newNumber && true}
          className="w-full cursor-pointer rounded bg-violet-500 p-2 text-2xl text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Submit
        </button>
      </form>
      <ul className="flex w-full flex-col justify-evenly">
        {calculations?.map((calculation) => (
          <li
            className="flex w-full justify-evenly border-b border-white/30 p-3 text-lg"
            key={calculation.id}
          >
            <span>{calculation.prevNum}</span>
            <span> + </span>
            <span>{calculation.num}</span>
            <span> = </span>
            <span>{(calculation.num + calculation.prevNum) / 2}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Numbers;
