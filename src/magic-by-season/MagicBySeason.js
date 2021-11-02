import React from "react"
import { BarStackHorizontal } from "@visx/shape"
import { SeriesPoint } from "@visx/shape/lib/types"
import { Group } from "@visx/group"
import { AxisBottom, AxisLeft } from "@visx/axis"
import cityTemperature, {
  CityTemperature
} from "@visx/mock-data/lib/mocks/cityTemperature"
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale"
import { timeParse, timeFormat } from "d3-time-format"
import { withTooltip, Tooltip, defaultStyles } from "@visx/tooltip"
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip"
import { LegendOrdinal } from "@visx/legend"
import magicBySeasonData from "./data-processing/magic-by-season-pct.json"

const defaultMargin = { top: 40, left: 50, right: 40, bottom: 100 }
const purple1 = "#0077C0"
const purple2 = "#C4CED4"
export const purple3 = "#000"
const background = "#fff"
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
}

const data = Object.values(magicBySeasonData).map(myObj =>
  Object.entries(myObj)
    .sort((a, b) => b[1] - a[1])
    .reduce(
      (_sortedObj, [k, v]) => ({
        ..._sortedObj,
        [k]: v
      }),
      {}
    )
)
console.log({ data })
const keys = Object.keys(data[0]).filter(d => d !== "Name")

// accessors
const getDate = d => d.Name

const temperatureScale = scaleLinear({
  domain: [0, 100],
  nice: true
})
const dateScale = scaleBand({
  domain: data.map(getDate),
  padding: 0.2
})
const colorScale = scaleOrdinal({
  domain: keys,
  range: [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77"
  ]
})

let tooltipTimeout

const MagicBySeason = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip
}) => {
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  temperatureScale.rangeRound([0, xMax])
  dateScale.rangeRound([yMax, 0])

  return (
    <div>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={getDate}
            xScale={temperatureScale}
            yScale={dateScale}
            color={colorScale}
            order="none"
          >
            {barStacks => {
              console.log(barStacks)
              return barStacks.map(barStack =>
                barStack.bars.map(bar => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(bar)}`)
                    }}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip()
                      }, 300)
                    }}
                    onMouseMove={() => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout)
                      const top = bar.y + margin.top
                      const left = bar.x + bar.width + margin.left
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left
                      })
                    }}
                  />
                ))
              )
            }}
          </BarStackHorizontal>
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={dateScale}
            tickFormat={d => d}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={() => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em"
            })}
          />
          <AxisBottom
            top={yMax}
            scale={temperatureScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={() => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: "middle"
            })}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          {/* <div style={{ color: colorScale(tooltipData.key) }}> */}
          <div style={{ color: () => "#fff" }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}%</div>
          <div>
            {/* <small>{formatDate(getDate(tooltipData.bar.data))}</small> */}
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default withTooltip(MagicBySeason)
