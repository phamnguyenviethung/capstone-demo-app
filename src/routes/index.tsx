import { createFileRoute } from '@tanstack/react-router';
import { MapContainer, STATIC_BOOTH_DATA, BOOTH_IDS } from '@/features/2dmap';
import svg from '@/assets/demo.svg';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MapContainer
      boothData={STATIC_BOOTH_DATA}
      boothIds={BOOTH_IDS}
      svgSource={svg}
      title="Ground Floor Layout"
      description="Interactive floor plan - hover to highlight, click to view store details"
    />
  );
}
