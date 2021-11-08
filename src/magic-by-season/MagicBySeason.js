import React, { useState } from "react"
import Select from "react-select"
import _ from "lodash"
import { Group } from "@visx/group"
import { scaleLinear, scaleOrdinal } from "@visx/scale"
import {
  withTooltip,
  Tooltip,
  defaultStyles,
  TooltipWithBounds
} from "@visx/tooltip"
import allMagicSeasons from "./data-processing/all-years.json"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import MainCategoryGraph from "./MainCategoryGraph"
import OtherCategoriesGraph from "./OtherCategoriesGraph"

// Sizing
const defaultMargin = { top: 0, left: 100, right: 100, bottom: 100 }
const headerHeight = 200

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
}

// Transform to format d3 undeerstands
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
const seasonSelectOptions = _.range(1990, 2021).map(yr => ({
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

const MagicBySeason = ({
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

  const colorScale = scaleOrdinal({
    domain: keys,
    range: [
      "#011428",
      "#011f3c",
      "#022950",
      "#023364",
      "#023d78",
      "#03478c",
      "#0352a0",
      "#045cb4",
      "#0466c8",
      "#0470dc",
      "#057af0",
      "#0f85fa",
      "#238ffb",
      "#3799fb",
      "#43a3fb",
      "#5fadfc",
      "#73b8fc",
      "#87c2fd",
      "#dde0e3",
      "#e9ebed",
      "#f4f5f6"
    ]
  })

  return (
    <div style={{ textAlign: "center", height: "100%" }}>
      <div style={{ height: headerHeight }}>
        <h1 className="magic">Magic Over the Years</h1>
        <h2 className="magic">
          Player totals by season, proportional to team totals
        </h2>
        <div
          style={{
            margin: "15px auto 0 auto",
            textAlign: "left",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div style={{ marginRight: 5, width: 175 }}>
            <label>Season</label>
            <Select
              isSearchable={false}
              options={seasonSelectOptions}
              onChange={selection => setSeason(selection.value)}
              value={seasonSelectOptions.find(opt => opt.value === season)}
            />
          </div>

          <div style={{ marginLeft: 5, width: 175 }}>
            <label>Category</label>
            <Select
              isSearchable={false}
              options={categorySelectOptions}
              onChange={selection => setCategory(selection.value)}
              value={categorySelectOptions.find(opt => opt.value === category)}
            />
          </div>
        </div>
      </div>
      <div style={{ height: 800 }}>
        <ParentSize>
          {({ height, width }) => {
            const xMargins = {
              left: width < 850 ? 30 : 100,
              right: width < 850 ? 5 : 100
            }
            const xMax = width - xMargins.left - xMargins.right
            const yMax = height / 2 - margin.top - margin.bottom
            percentageScale.rangeRound([0, xMax])
            return (
              <>
                <svg width={width} height={height}>
                  <Group top={margin.top} left={xMargins.left}>
                    <MainCategoryGraph
                      data={[data.find(d => d.category === category)]}
                      xScale={percentageScale}
                      {...{
                        colorScale,
                        keys,
                        getCategory,
                        active,
                        setActive,
                        showTooltip,
                        hideTooltip,
                        headerHeight,
                        yMax,
                        width
                      }}
                    />
                    <OtherCategoriesGraph
                      data={data.filter(d => d.category !== category)}
                      xScale={percentageScale}
                      {...{
                        colorScale,
                        keys,
                        getCategory,
                        active,
                        setActive,
                        showTooltip,
                        hideTooltip,
                        headerHeight,
                        yMax
                      }}
                    />
                  </Group>
                </svg>
                {tooltipOpen && tooltipData && (
                  <TooltipWithBounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={tooltipStyles}
                  >
                    <div style={{ color: () => "#fff" }}>
                      <strong>{tooltipData.key}</strong>
                    </div>
                    <div>
                      {
                        totals.find(
                          t => t.category === tooltipData.bar.data.category
                        )[tooltipData.key]
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
                  </TooltipWithBounds>
                )}
              </>
            )
          }}
        </ParentSize>
      </div>
    </div>
  )
}

export default withTooltip(MagicBySeason)
