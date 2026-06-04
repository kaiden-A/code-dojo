import DeploymentScene from './components/DeploymentScene';
import DeploymentBackground from './components/DeploymentBackground';
import SectionNav from './components/SectionNav';

export default function DeploymentPage() {
  return (
    <main className="relative bg-ink cursor-none">
      <DeploymentBackground />
      <div className="relative z-10">
        <SectionNav />
        <DeploymentScene />
      </div>
    </main>
  );
}
