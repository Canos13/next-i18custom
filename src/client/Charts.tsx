import dynamic from "next/dynamic"

//ApexChartJs Library
const Chart = dynamic(() => import('react-apexcharts'),{ ssr: false });
export default Chart

//My Charts
const BarChart = dynamic(() => import("@/components/Bar"), { ssr: false })
const Spline = dynamic(() => import("@/components/Spline"),{ ssr: false })

export {
    BarChart,
    Spline
}
