import { ResponsiveBar } from '@nivo/bar'

const BarChart = ({data, keys, LegendLabel}) => {
  return (
      <ResponsiveBar
      
      data={data}
      keys={[keys]}
      indexBy="day"
      margin={{ top: 30, right: 25, bottom: 50, left: 60 }}
      padding={0.4}
      valueScale={{ type: "linear" }}
      colors="#006b44"
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: LegendLabel,
        legendPosition: "middle",
        legendOffset: -40
      }}
    />
    
  )
}

export default BarChart