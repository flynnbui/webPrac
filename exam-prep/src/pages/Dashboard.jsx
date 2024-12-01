import PageFooter from "@/components/PageFooter";
import PageHeader from "@/components/PageHeader";
import api from "@/config/axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [score, setScore] = useState('');
  const fetchScore = async () => {
    const response = await api.get();
    return response
  }
  const initializeScore = async () => {
    const savedScore = localStorage.getItem('score');
    if (savedScore) {
      setScore(savedScore);
    } else {
      const response = await fetchScore();
      setScore(response.data.score);
    }
  };
  useEffect(() => {
    initializeScore();
  }, []);

  const resetScore = async () => {
    localStorage.setItem('score', 0);
    setScore(localStorage.getItem('score'));
  }


  return (
    <div className="flex flex-col w-screen h-screen">
      <PageHeader />
      <div className="m-auto">
        <div className="text-center">
          <div className="text-red-300"> Please choose an option from the navbar.</div>
        </div>
        <div className=" text-center">
          <div className="text-red-300">
            <p>Games won: {score}</p>
            <button onClick={() => resetScore()}>Reset</button>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

export default Dashboard;
