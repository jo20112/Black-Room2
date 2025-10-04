import { RadarChart } from "../RadarChart";

export default function RadarChartExample() {
  return (
    <div className="p-8 bg-card">
      <RadarChart
        scores={{
          openness: 75,
          conscientiousness: 82,
          extraversion: 45,
          agreeableness: 68,
          neuroticism: 35,
        }}
      />
    </div>
  );
}
