import { ResponsivePie } from '@nivo/pie'

const pieData = [
    {
      id: "Apples",
      label: "Apples",
      value: 120,
      color: "hsl(158, 100%, 21%)"
    },
    {
      id: "Banana",
      label: "Banana",
      value: 100,
      color: "hsl(158, 100%, 69%)"
    },
    {
      id: "Rice",
      label: "Rice",
      value: 90,
      color: "hsl(158, 77%, 58%)"
    },
    {
      id: "Juice",
      label: "Canned Mushrooms",
      value: 80,
      color: "hsl(11, 83%, 33%)"
    },
    {
      id: "Canned Corn",
      label: "Canned Corn",
      value: 75,
      color: "hsl(11, 77%, 58%)"
    },
  ];

  import React from 'react'
  
  const PieChart = () => {
    return (
        <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
    )
  }
  
  export default PieChart