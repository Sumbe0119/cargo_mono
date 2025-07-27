import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const colors = [
  'rgba(75, 192, 192, 0.6)',
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
]

const DelivredCountChartComponent = ({ row }: any) => {
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

    const datasets = (row || []).map((warehouse: any, index: number) => {
      return {
        label: warehouse.warehouseName,
        data: (warehouse?.monthlyCounts || [])?.map((e: any) => e.sentCount),
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
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Хүргэлтээр гарсан бараа',
          },
          tooltip: {
            callbacks: {
              label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y} ширхэг`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Тоо (ширхэг)',
            },
            ticks: {
              stepSize: 1,
              precision: 0,
            },
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

export default DelivredCountChartComponent
