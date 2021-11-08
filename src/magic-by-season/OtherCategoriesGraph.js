import React from "react"
import { BarStackHorizontal } from "@visx/shape"
import { AxisLeft } from "@visx/axis"
import { localPoint } from "@visx/event"
import { scaleBand } from "@visx/scale"

const OtherCategoriesGraph = ({
  data,
  colorScale,
  keys,
  xScale,
  yScale,
  getCategory,
  active,
  setActive,
  showTooltip,
  tooltipTimeout,
  hideTooltip,
  headerHeight,
  yMax
}) => {
  const categoryScale = scaleBand({
    domain: data.map(getCategory),
    padding: 0.2
  })
  categoryScale.rangeRound([yMax, 0])
  return (
    <>
      <BarStackHorizontal
        data={data}
        keys={keys}
        height={200}
        y={getCategory}
        xScale={xScale}
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
                  key={`barstack-horizontal-${barStack.index}-${bar.index}-other-cat`}
                  x={bar.x}
                  y={bar.y + 350}
                  style={{
                    width: bar.width - 1,
                    opacity: bar.key === active || !active ? 1 : 0.5,
                    transition: "width 0.25s ease-in-out, opacity 0.5s"
                  }}
                  width={bar.width - 1}
                  // height={bar.height}
                  height={45}
                  fill={bar.color}
                  onMouseLeave={() => {
                    setActive(null)
                    hideTooltip()
                  }}
                  onMouseMove={event => {
                    setActive(bar.key)
                    const coords = localPoint(event)
                    showTooltip({
                      tooltipData: bar,
                      tooltipTop: coords.y + headerHeight,
                      tooltipLeft: coords.x
                    })
                  }}
                />
              </>
            ))
          })
        }}
      </BarStackHorizontal>
      <AxisLeft
        top={headerHeight + 150}
        hideAxisLine
        hideTicks
        scale={categoryScale}
        tickFormat={d => d}
        roke={"black"}
        tickLabelProps={() => ({
          fill: "black",
          fontSize: 11,
          textAnchor: "end",
          dy: "0.33em"
        })}
      />
    </>
  )
}

export default OtherCategoriesGraph
