import { EmptyService } from "./_components/empty-service";
import { ServiceHeader } from "./_components/service-header";


export default function ServicePage() {
    return <main className="w-full flex flex-col px-4">
       <ServiceHeader/>
       <EmptyService/>
    </main>;
}