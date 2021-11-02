import React, { useState } from "react"
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
import Text from "@visx/text/lib/Text"

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

// const data = Object.values(magicBySeasonData).map(myObj =>
//   Object.entries(myObj)
//     .sort((a, b) => b[1] - a[1])
//     .reduce(
//       (_sortedObj, [k, v]) => ({
//         ..._sortedObj,
//         [k]: v
//       }),
//       {}
//     )
// )
const data = Object.values(magicBySeasonData).reverse()
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
    "#0466c8",
    "#0353a4",
    "#023e7d",
    "#002855",
    "#001845",
    "#001233",
    "#33415c",
    "#5c677d",
    "#7d8597",
    "#979dac"
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
  const [active, setActive] = useState(null)
  const [anyEnter, setanyEnter] = useState(false)

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
            // order="ascending"
            // offset="diverging"
          >
            {barStacks => {
              return barStacks.map((barStack, i) => {
                return barStack.bars.map((bar, j) => (
                  <>
                    <rect
                      key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                      x={bar.x}
                      y={j === 4 ? bar.y : bar.y + bar.height}
                      width={bar.width - 1}
                      height={j === 4 ? bar.height : bar.height / 2}
                      fill={bar.color}
                      fillOpacity={bar.key === active || !active ? 1 : 0.75}
                      stroke={bar.key === active ? "#000" : undefined}
                      strokeWidth={bar.key === active ? 1 : 0}
                      onClick={() => {
                        if (events) alert(`clicked: ${JSON.stringify(bar)}`)
                      }}
                      onMouseLeave={() => {
                        setActive(null)
                        setanyEnter(false)
                        tooltipTimeout = window.setTimeout(() => {
                          hideTooltip()
                        }, 300)
                      }}
                      onMouseMove={() => {
                        setActive(bar.key)
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
                    {j === 4 && i < 11 && (
                      <Text
                        x={bar.x + bar.width / 2}
                        y={bar.y + bar.height + 15}
                        angle={315}
                        // verticalAnchor={"end"}
                        textAnchor="end"
                        fill={bar.color}
                      >
                        {bar.key}
                      </Text>
                    )}
                  </>
                ))
              })
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
          {/* <AxisBottom
            top={yMax}
            scale={temperatureScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={() => ({
              fill: purple3,
              fontSize: 11,
              textAnchor: "middle"
            })}
          /> */}
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
