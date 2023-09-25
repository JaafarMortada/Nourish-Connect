import { ResponsivePie } from '@nivo/pie'

import React from 'react'

const PieChart = ({ data, sortBy = 'quantity_sold' }) => {

  const pieData = data.map(item => ({
    id: item.item_name,
    label: item.item_name,
    value: sortBy === 'quantity_sold' ? item.quantity_sold : item.sold_value
  }))

  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
      innerRadius={0.5}
      padAngle={0}
      cornerRadius={3}
      activeOuterRadiusOffset={2}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={25}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={25}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
    />
  )
}

export default PieChart