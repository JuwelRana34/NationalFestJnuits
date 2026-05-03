import { getSegment } from "@/features/Events/actions";
import Events from "@/features/Events/components/Events";
import { CreateSegmentParams } from "@/features/Events/Types";

export interface FullEvent extends CreateSegmentParams {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function EventPage() {
  const { data } = await getSegment();

  return (
    <>
      {data.length === 0 ? (
        <div className="p-4 bg-gray-100 rounded">No events found.</div>
      ) : (
        <Events eventsData={data as FullEvent[]} />
      )}
    </>
  );
}
