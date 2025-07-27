import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

interface ChartComponentProps {
  row?: {
    warehouseId: number
    warehouseName: string
    monthlySales: { month: string; totalPrice: number }[]
  }[]
}
const colors = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]
const ChartComponent = ({ row }: ChartComponentProps) => {
  
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const labels = [
      '1-р сар',
      '2-р сар',
      '3-р сар',
      '4-р сар',
      '5-р сар',
      '6-р сар',
      '7-р сар',
      '8-р сар',
      '9-р сар',
      '10-р сар',
      '11-р сар',
      '12-р сар',
    ]
    const datasets = (row || []).map((warehouse, index) => {
      return {
        label: warehouse.warehouseName,
        data: warehouse.monthlySales.map((entry) => entry.totalPrice),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    })

    const data = {
      labels,
      datasets: datasets,
    }

    const config: any = {
      type: 'line' as const,
      data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Сар бүрийн борлуулалт (₮)',
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => {
                const value = ctx.parsed.y
                return `${ctx.dataset.label}: ${value?.toLocaleString()}₮`
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index' as const,
        },
        scales: {
          x: {
            display: true,
            title: { display: true, text: 'Сар' },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Борлуулалт (₮)',
            },
            ticks: {
              callback: (value: number) => value.toLocaleString() + '₮',
            },
            suggestedMin: 0,
            suggestedMax: 200000,
          },
        },
      },
    }

    chartInstanceRef.current = new Chart(chartRef.current, config)
  }, [row])

  return (
    <div className="bg-white rounded-xl p-4 mb-6">
      <canvas ref={chartRef} height={100}></canvas>
    </div>
  )
}

export default ChartComponent
