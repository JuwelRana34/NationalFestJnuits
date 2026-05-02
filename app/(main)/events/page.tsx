import { getSegment } from "@/features/Events/actions";
import Events from "@/features/Events/components/Events";
import { CreateSegmentParams } from "@/features/Events/Types";

 export interface FullEvent extends CreateSegmentParams {
   id: string | number;
   createdAt: Date;
   updatedAt: Date;
 }
 
export default async function EventPage() {
   const {data} = await getSegment();

 
  //  console.log(data);

    return (
      <>
        <Events eventsData={data as FullEvent[]} />
      </>
    );
}