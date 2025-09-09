import { createFileRoute } from '@tanstack/react-router';
import { MapContainer, STATIC_BOOTH_DATA, BOOTH_IDS, FLOOR_PLANS } from '@/features/2dmap';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  // Convert FLOOR_PLANS to the format expected by MapContainer
  const floors = FLOOR_PLANS.map(floor => ({
    floor: floor.floor,
    svgSource: floor.svgPath,
    name: floor.name,
  }));

  return (
    <MapContainer
      boothData={STATIC_BOOTH_DATA}
      boothIds={BOOTH_IDS}
      floors={floors}
      title="Multi-Floor Layout"
      description="Interactive floor plan - select floor, hover to highlight, click to view store details"
    />
  );
}
