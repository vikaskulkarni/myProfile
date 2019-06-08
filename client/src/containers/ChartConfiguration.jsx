const config = (skillCategories, skills) => {
  return {
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      title: {
        text: "Technical Skills",
        align: "center",
        style: {
          color: "#444"
        }
      },
      subtitle: {
        text: "Full Stack Developer with JAVA, REACTJS and NODE",
        align: "center"
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false
        },
        y: {
          formatter: function(val) {
            return val + "/10";
          },
          title: {
            formatter: function() {
              return "";
            }
          }
        }
      },
      plotOptions: {
        bar: {
          distributed: true,
          horizontal: true
        }
      },
      colors: [
        "#FFFFFF",
        "#00BCD4",
        "#546E7A",
        "#d4526e",
        "#A5978B",
        "#2b908f",
        "#f48024",
        "#B10DC9",
        "#3D9970",
        "#DCDCDC"
      ],
      dataLabels: {
        enabled: true,
        formatter: function(value, { seriesIndex, dataPointIndex, w }) {
          return w.config.series[seriesIndex].labels[dataPointIndex];
        },
        dropShadow: {
          enabled: true
        }
      },
      xaxis: {
        categories: skillCategories,
        labels: {
          formatter: function(val) {
            return val;
          }
        }
      }
    },
    series: [
      {
        data: [10, 7, 6.5, 5.5, 6, 7, 7.5, 6, 6.5, 10],
        labels: skills
      }
    ]
  };
};

export default config;
