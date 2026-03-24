import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function Dashboard() {
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    fetchTelemetry();
  }, []);

  async function fetchTelemetry() {
    const response = await fetch("https://telemetry-relay.sakuraonijinn-90f.workers.dev/retrieve");
    const data = await response.json();
    setTelemetry(data);
  }

  return (
    <div>
      <h1>User Experience Analytics</h1>
      <Line
        data={{
          labels: telemetry.map((_, i) => `Session ${i + 1}`),
          datasets: [
            {
              label: "Latency (ms)",
              data: telemetry.map((t) => t.metrics.latency),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}

export default Dashboard;
