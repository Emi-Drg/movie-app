import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#BACD92"];
const MovieChart = () => {
  const { topMovies } = useContext(MovieContext);
  const data1 = {};
  topMovies.forEach((el) => {
    if (data1[el.releaseYear]) {
      data1[el.releaseYear] += 1;
    } else {
      data1[el.releaseYear] = 1;
    }
  });
  const data2 = Object.entries(data1).map((el) => {
    return { name: el[0], value: el[1] };
  });

  return (
    <div className=" bg-gray-400 h-screen font-serif">
      <div className="text-center text-lg pt-1">
        Distribution of the movies by release years{" "}
      </div>
      <div className="flex justify-center">
        <PieChart width={500} height={500}>
          <Pie
            data={data2}
            cx={250}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default MovieChart;
