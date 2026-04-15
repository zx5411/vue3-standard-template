<template>
  <div ref="containerRef" class="base-chart" :style="{ height }" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { use, init } from 'echarts/core'
import type { ECharts, EChartsCoreOption } from 'echarts/core'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { LineChart, PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, LegendComponent, TooltipComponent, LineChart, PieChart, CanvasRenderer])

const props = withDefaults(
  defineProps<{
    option: EChartsCoreOption
    height?: string
  }>(),
  {
    height: '320px',
  },
)

const containerRef = ref<HTMLDivElement | null>(null)
const chartRef = shallowRef<ECharts | null>(null)

let resizeObserver: ResizeObserver | null = null

function resizeChart() {
  chartRef.value?.resize()
}

function renderChart(option: EChartsCoreOption) {
  if (!containerRef.value) {
    return
  }

  if (!chartRef.value) {
    chartRef.value = init(containerRef.value)
  }

  chartRef.value.setOption(option, true)
}

onMounted(() => {
  renderChart(props.option)
  window.addEventListener('resize', resizeChart)

  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeChart()
    })
    resizeObserver.observe(containerRef.value)
  }
})

watch(
  () => props.option,
  (option) => {
    renderChart(option)
  },
  { deep: true },
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  resizeObserver?.disconnect()
  resizeObserver = null
  chartRef.value?.dispose()
  chartRef.value = null
})
</script>

<style scoped>
.base-chart {
  width: 100%;
}
</style>
