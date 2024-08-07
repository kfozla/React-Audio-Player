import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./global.css";
import { Button } from "./components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EpisodesList from "./components/ui/EpisodesList";
import { AudioProvider } from "./provider/AudioProvider";
import AudioPlayer from "./components/ui/player/AudioPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <EpisodesList></EpisodesList>
        <div className="fixed inset-x-0 bottom-10">
          <AudioPlayer></AudioPlayer>
        </div>
      </AudioProvider>
    </QueryClientProvider>
  );
}

export default App;
