import NextNProgress from "nextjs-progressbar";

export default function ProgressBar() {
  return (
    <>
      <NextNProgress
        color="#00000"
        startPosition={5}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
    </>
  );
}
