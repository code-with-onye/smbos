import { DesignBoard } from "./_componnents/design-board";
import { DesignFrame } from "./_componnents/design-frame";
import { MobileView } from "./_componnents/mobile-view-designFrame";

export default function DesignPage() {
    return (
        <section className="w-full">
            <div className="w-full flex gap-x-2 p-4">
                <DesignBoard/>
                <DesignFrame url={'https://linkedio.framer.ai/'} className="hidden xl:block"/>
            </div>
            <MobileView/>
        </section>
    )
}