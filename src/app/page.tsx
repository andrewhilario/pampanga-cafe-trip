import { TripProvider } from '@/context/TripContext';
import { MainPlanner } from '@/components/MainPlanner';

export default function Home() {
  return (
    <TripProvider>
      <MainPlanner />
    </TripProvider>
  );
}
