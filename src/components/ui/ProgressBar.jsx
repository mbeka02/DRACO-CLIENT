import LinearProgress from "@mui/material/LinearProgress";

const ProgressBar = () => {
  return (
    <div className="h-6 w-full absolute top-0 rounded-sm" style={{ color: "#0077FF" }}>
      <LinearProgress color="inherit" />
    </div>
  );
};

export default ProgressBar;
