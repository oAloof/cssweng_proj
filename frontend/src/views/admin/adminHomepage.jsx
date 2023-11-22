import React, { useState } from "react";
import Chart from "react-apexcharts";
import AdminNavbar from "../../components/admin/adminNavbar.jsx";
import {
  faChartLine,
  faBox,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrdersTable from "../../components/admin/ordersTable.jsx";

const data = [
  {
    label: "Total Sales",
    path: "/",
    icon: faChartLine,
    value: "1000",
  },
  {
    label: "Total Orders",
    path: "/admin/sales",
    icon: faBox,
    value: "1000",
  },
  {
    label: "Orders to Process",
    path: "/admin/orders",
    icon: faSpinner,
    value: "1000",
  },
];

function Card({ icon, label, value }) {
  return (
    <div className="w-full mt-6 px-6 sm:w-1/3 sm:mt-0 ">
      <div
        className={`h-full w-full flex items-center py-6 shadow-sm rounded-md bg-white bg-opacity-75 px-3 font-Proxima`}
      >
        <div className={`p-3 rounded-full items-center`}>
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            style={{ color: "var(--brand-color" }}
          />
        </div>
        <div className="mx-2 place-self-stretch self-center">
          <h4 className="text-4xl font-semibold text-gray-700">{value}</h4>
          <div className="text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  if (localStorage.getItem("isAuthenticated") !== "true") {
    return <div>404 Page Not Found</div>;
  }

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "sales-revenue-chart",
        toolbar: {
          show: false,
        },
        background: "white",
        foreColor: "text-gray-500",
        fontFamily: "var(--font-nunito)",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "text-gray-400",
            fontSize: "text-xs",
            fontFamily: "var(--font-Proxima-Nova)",
            fontWeight: "500",
          },
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 5,
        lineCap: "round",
      },
      markers: {
        size: 5,
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeColors: "white",
        fillOpacity: 1,
        colors: "var(--brand-color)",
      },
      tooltip: {
        theme: "light",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#6b71ee"],
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: "#ff5d7c",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#6b71ee",
              opacity: 1,
            },
          ],
        },
      },
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 25, 50, 49, 21, 70, 51, 42, 60, 45, 30],
      },
    ],
  });

  const ChartSection = ({ revenue }) => {
    return (
      <div className="mt-8 relative bg-white rounded-xl shadow-lg p-3 mb-8">
        <div className="relative top-0 left-0 text-gray-400 text-2xl font-medium ">
          Total Revenue
          <h4 className="text-4xl font-semibold font-Proxima text-gray-700">
            $100,000
          </h4>
        </div>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-200 font-proxima">
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">
              Admin Dashboard
            </h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                {data.map((stats) => (
                  <Card
                    icon={stats.icon}
                    label={stats.label}
                    subtitle={stats.subtitle}
                    value={stats.value}
                  />
                ))}
              </div>
            </div>
            <ChartSection />
            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
