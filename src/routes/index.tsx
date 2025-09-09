import { createFileRoute } from '@tanstack/react-router';
import { MapContainer, STATIC_BOOTH_DATA, BOOTH_IDS } from '@/features/2dmap';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MapContainer
      boothData={STATIC_BOOTH_DATA}
      boothIds={BOOTH_IDS}
      title="Multi-Floor Layout"
      description="Interactive floor plan - select floor, hover to highlight, click to view store details"
    />
  );
}
