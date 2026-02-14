import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function MoodAnalytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const entries = location.state?.entries || [];

  const totalEntries = entries.length;

  // Mappings
  const moodScoreMap = {
    Overwhelmed: 0,
    Angry: 1,
    Sad: 2,
    Anxious: 3,
    Calm: 4,
    Happy: 5,
  };
  const moodLabelsByScore = Object.entries(moodScoreMap).reduce(
    (acc, [label, score]) => {
      acc[score] = label;
      return acc;
    },
    {}
  );
  const moodColorMap = {
    Happy: "#facc15",
    Sad: "#60a5fa",
    Angry: "#f87171",
    Calm: "#34d399",
    Anxious: "#c084fc",
    Overwhelmed: "#6366f1",
  };

  // Counts
  const moodCounts = entries.reduce((acc, e) => {
    if (e.mood?.label) acc[e.mood.label] = (acc[e.mood.label] || 0) + 1;
    return acc;
  }, {});
  const sentimentCounts = entries.reduce(
    (acc, e) => {
      if (e.sentiment?.label) acc[e.sentiment.label]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  // Mood vs Sentiment mismatch
  let matched = 0,
    mismatched = 0;
  entries.forEach((e) => {
    if (!e.mood || !e.sentiment) return;
    const positiveMoods = ["Happy", "Calm"];
    const negativeMoods = ["Sad", "Angry", "Overwhelmed"];
    const moodIsPositive = positiveMoods.includes(e.mood.label);
    const moodIsNegative = negativeMoods.includes(e.mood.label);

    if (
      (moodIsPositive && e.sentiment.label === "positive") ||
      (moodIsNegative && e.sentiment.label === "negative") ||
      (e.mood.label === "Calm" && e.sentiment.label === "neutral")
    ) {
      matched++;
    } else {
      mismatched++;
    }
  });

  // Charts
  const barChartData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: "Mood Count",
        data: Object.values(moodCounts),
        backgroundColor: Object.keys(moodCounts).map((m) => moodColorMap[m] || "#8884d8"),
        borderRadius: 12,
        barThickness: 30,
      },
    ],
  };

  const lineChartData = {
    datasets: [
      {
        label: "Mood Over Time",
        data: entries
          .filter((e) => e.mood)
          .map((entry) => ({
            x: new Date(entry.timestamp || entry.date),
            y: moodScoreMap[entry.mood.label],
          })),
        borderColor: "#c084fc",
        backgroundColor: "rgba(192,132,252,0.3)",
        fill: true,
        tension: 0.3,
        parsing: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const sentimentPieData = {
    labels: ["Positive 😊", "Neutral 😐", "Negative 😔"],
    datasets: [
      {
        label: "AI Sentiment",
        data: [sentimentCounts.positive, sentimentCounts.neutral, sentimentCounts.negative],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  const mismatchBarData = {
    labels: ["Matched", "Mismatched"],
    datasets: [
      {
        label: "Mood vs Sentiment",
        data: [matched, mismatched],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const count = context.raw;
            const percentage = ((count / totalEntries) * 100).toFixed(1);
            return `${count} entries (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#e0e0e0" }, grid: { color: "#3a2a52" } },
      x: { ticks: { color: "#e0e0e0" }, grid: { display: false } },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { type: "time", time: { unit: "day" }, ticks: { color: "#e0e0e0" }, grid: { color: "#3a2a52" } },
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => moodLabelsByScore[value] || "",
          color: "#e0e0e0",
        },
        grid: { color: "#3a2a52" },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#26143c] via-[#38204f] to-[#2d1340] text-white p-6 flex flex-col items-center">
      <Button
        onClick={() => navigate(-1)}
        className="self-start mb-6 bg-purple-600 hover:bg-purple-500 shadow-md"
        size="sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Journal
      </Button>

      <h1 className="text-4xl font-extrabold mb-10 text-purple-200 tracking-wider">
        📊 Mood & Sentiment Analytics
      </h1>

      {totalEntries === 0 ? (
        <p className="text-purple-300 italic text-lg">No journal entries to analyze.</p>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-300/20">
            <h2 className="text-xl font-semibold mb-4 text-purple-200">Mood Distribution</h2>
            <CardContent className="h-[300px] relative">
              <div className="absolute inset-0">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-300/20">
            <h2 className="text-xl font-semibold mb-4 text-purple-200">Mood Over Time</h2>
            <CardContent className="h-[300px] relative">
              <div className="absolute inset-0">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-300/20">
            <h2 className="text-xl font-semibold mb-4 text-purple-200">AI Sentiment Distribution</h2>
            <CardContent className="h-[300px] relative">
              <div className="absolute inset-0">
                <Pie data={sentimentPieData} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-purple-300/20">
            <h2 className="text-xl font-semibold mb-4 text-purple-200">Mood vs Sentiment Mismatch</h2>
            <CardContent className="h-[300px] relative">
              <div className="absolute inset-0">
                <Bar data={mismatchBarData} options={{ indexAxis: "y" }} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
