import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BeatLoader
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#ff0000"
        loading={true}
      />
    </div>
  );
};

export default Loading;
