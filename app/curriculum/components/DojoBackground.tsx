export default function DojoBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 tatami-texture animate-breathe" />
      <div className="absolute inset-0 shoji-pattern opacity-10" />
    </div>
  );
}