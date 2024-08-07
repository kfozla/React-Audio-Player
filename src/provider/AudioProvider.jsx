import { createContext, useMemo, useReducer, useRef } from "react";

const ACTIONS = {
  SET_META: "SET_META",
  PLAY: "PLAY",
  PAUSE: "PAUSE",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_DURATION: "SET_DURATION",
};

export const AudioPlayerContext = createContext();

const initialState = {
  episode: null,
  playing: false,
  muted: false,
  currentTime: 0,
  duration: 0,
};

const audioReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_META:
      return { ...state, episode: action.payload };
    case ACTIONS.PLAY:
      return { ...state, playing: true };
    case ACTIONS.PAUSE:
      return { ...state, playing: false };
    case ACTIONS.TOGGLE_MUTE:
      return { ...state, muted: !state.muted };
    case ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload };
    case ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    default:
      return state;
  }
};

export function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  const playerRef = useRef();
  const actions = useMemo(
    () => ({
      play(episode) {
        if (episode) {
          dispatch({ type: ACTIONS.SET_META, payload: episode });
          if (playerRef.current && playerRef.current.src !== episode.audioUrl) {
            const playbackRate = playerRef.current.playbackRate;
            playerRef.current.src = episode.audioUrl;
            playerRef.current.load();
            playerRef.current.pause();
            playerRef.current.playbackRate = playbackRate;
            playerRef.current.currentTime = 0;
          }
        }
        playerRef.current.play();
      },
      pause() {
        if (playerRef.current) {
          playerRef.current.pause();
        }
      },
      toggle(episode) {
        this.isPlaying(episode) ? this.pause() : this.play(episode);
      },
      toggleMute() {
        dispatch({ type: ACTIONS.TOGGLE_MUTE });
      },
      seekBy(amount) {
        if (playerRef.current) playerRef.current.currentTime += amount;
      },
      seekTo(time) {
        if (playerRef.current) playerRef.current.currentTime = time;
      },
      playbackRate(rate) {
        if (playerRef.current) playerRef.current.playbackRate = rate;
      },
      isPlaying(episode) {
        return episode
          ? state.playing && playerRef.current?.currentSrc === episode.audioUrl
          : state.playing;
      },
    }),
    [state.playing]
  );

  const api = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return (
    <>
      <AudioPlayerContext.Provider value={{ ...api }}>
        {children}
      </AudioPlayerContext.Provider>
      <audio
        id="custom-audio-player"
        ref={playerRef}
        muted={state.muted}
        onPlay={() => dispatch({ type: ACTIONS.PLAY })}
        onPause={() => dispatch({ type: ACTIONS.PAUSE })}
        onTimeUpdate={(e) =>
          dispatch({
            type: ACTIONS.SET_CURRENT_TIME,
            payload: e.currentTarget.currentTime,
          })
        }
        onDurationChange={(e) =>
          dispatch({
            type: ACTIONS.SET_DURATION,
            payload: e.currentTarget.duration,
          })
        }
      ></audio>
    </>
  );
}
