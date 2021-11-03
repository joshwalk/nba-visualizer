import React, { useState } from "react"
import Select from "react-select"
import _ from "lodash"
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
import allMagicSeasons from "./data-processing/all-years.json"

const defaultMargin = { top: 0, left: 200, right: 200, bottom: 100 }
const black = "#000"
const background = "#fff"
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
}

const getSeasonData = season => {
  const totals = allMagicSeasons[season]

  const transformed = totals.map(cat => {
    return Object.keys(cat).reduce((acc, key) => {
      const total = cat.total
      if (key === "total") return acc
      if (key === "category") {
        acc["category"] = cat.category
      } else {
        if (cat[key] > 0.1) {
          acc[key] = (cat[key] / total) * 100
        } else acc[key] = 0.1
      }
      return acc
    }, {})
  })

  return {
    data: transformed,
    keys: Object.keys(totals[0]).filter(
      d => !["category", "total"].includes(d)
    ),
    totals
  }
}

const getCategory = d => d.category
const percentageScale = scaleLinear({
  domain: [0, 100],
  nice: true
})

// Dropdown options
const seasonSelectOptions = _.range(1990, 2022).map(yr => ({
  value: yr.toString(),
  label: `${yr - 1}-${yr}`
}))
const categoryAbbrevToFullName = {
  PTS: "Points",
  AST: "Assists",
  TRB: "Rebounds",
  BLK: "Blocks",
  STL: "Steals"
}
const categorySelectOptions = Object.entries(categoryAbbrevToFullName).map(
  ([k, v]) => ({ value: k, label: v })
)

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
  const [active, setActive] = useState(null)
  const [season, setSeason] = useState("2020")
  const [category, setCategory] = useState("PTS")

  const { keys, data, totals } = getSeasonData(season)

  const categoryScale = scaleBand({
    domain: data.map(getCategory),
    padding: 0.2
  })
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [
      "#001845",
      "#002855",
      "#023e7d",
      "#0353a4",
      "#0466c8",
      "#161616",
      "#788091",
      "#848b9a",
      "#8F95A3",
      "#9AA0AC",
      "#a5abb6",
      "#B0B5BF",
      "#BCC0C8",
      "#c7cad1",
      "#d2d5da",
      "#dde0e3",
      "#e9ebed",
      "#f4f5f6",
      "#fff"
    ]
  })
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom
  percentageScale.rangeRound([0, xMax])
  categoryScale.rangeRound([yMax, 0])

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Magic Player Contribution</h1>
      {/* note: selects are messing up tooltip spacing */}
      <div style={{ width: 300, margin: "0 auto" }}>
        <Select
          options={seasonSelectOptions}
          onChange={selection => setSeason(selection.value)}
          value={seasonSelectOptions.find(opt => opt.value === season)}
        />
        <Select
          options={categorySelectOptions}
          onChange={selection => setCategory(selection.value)}
          value={categorySelectOptions.find(opt => opt.value === category)}
        />
      </div>

      <svg width={width} height={height}>
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={getCategory}
            xScale={percentageScale}
            yScale={categoryScale}
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
                      y={bar.y}
                      style={{
                        width: bar.width - 1,
                        opacity: bar.key === active || !active ? 1 : 0.75,
                        transition: "width 0.25s ease-in-out, opacity 0.5s"
                      }}
                      width={bar.width - 1}
                      height={bar.height}
                      fill={bar.color}
                      onClick={() => {
                        if (events) alert(`clicked: ${JSON.stringify(bar)}`)
                      }}
                      onMouseLeave={() => {
                        setActive(null)
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
                    {/* {j === 4 && i < 11 && (
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
                    )} */}
                  </>
                ))
              })
            }}
          </BarStackHorizontal>
          <AxisLeft
            // hideAxisLine
            hideTicks
            scale={categoryScale}
            tickFormat={d => d}
            roke={black}
            tickLabelProps={() => ({
              fill: black,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em"
            })}
          />
          {/* <AxisBottom
            top={yMax}
            scale={percentageScale}
  roke={black}
          roke={black}
            tickLabelProps={() => ({
fill: black,
              fontSize: 11,
              textAnchor: "middle"
            })}
          /> */}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ color: () => "#fff" }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>
            {
              totals.find(t => t.category === tooltipData.bar.data.category)[
                tooltipData.key
              ]
            }
          </div>
          <div>
            <small>
              {tooltipData.bar.data[tooltipData.key] === 0.1
                ? "<.1"
                : _.round(tooltipData.bar.data[tooltipData.key], 1)}
              {"%"}
            </small>
          </div>
        </Tooltip>
      )}
    </div>
  )
}

export default withTooltip(MagicBySeason)
