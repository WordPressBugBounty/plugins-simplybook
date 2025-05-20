import { createLazyFileRoute } from "@tanstack/react-router";
import { __ } from "@wordpress/i18n";
import OnboardingStep from "../../components/Onboarding/OnboardingStep";
import LeftColumn from "../../components/Grid/LeftColumn";
import RightColumn from "../../components/Grid/RightColumn";
import VideoFrame from "../../components/Media/VideoFrame";

const path = "/onboarding/create-your-account";

export const Route = createLazyFileRoute(path)({
    component: () => <CreateLoginAccount />
});

function CreateLoginAccount() {

    return(
        <>
            <LeftColumn
                className={"flex-col col-span-5 col-start-2"}
            >
                <div className={"text-center"}>
                    <h1 className={"text-4xl font-semibold text-black mb-4"}>
                        {__("Create your free account", "simplybook")}
                    </h1>
                    <h2 className={"mt-2 text-lg font-light text-black"}>
                        {__("100% free. No credit card needed.", "simplybook")}
                    </h2>

                </div>
                <OnboardingStep
                    path={path}
                    primaryButton={{
                        disabled: false,
                    }}
                />
            </LeftColumn>
            <RightColumn
                className={"col-span-5 justify-center"}
            >
                <div className="pb-4">
                    <VideoFrame
                        FrameWrapperClass="aspect-w-16 aspect-h-9 mb-8"
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/qgMn9dKJAt4"
                        title={__("How to get started with SimplyBook.me", "simplybook")}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        refPolicy="strict-origin-when-cross-origin"
                    />
                    <div className="text-center flex flex-col items-center">
                        <h1 className="m-0 mb-4 text-2xl">
                            {__("SimplyBook.me fits seamlessly into your business", "simplybook")}
                        </h1>
                        <small className="text-lg text-gray-400 w-3/4">
                            {__("It’s easy to keep your appointments in sync with the apps and plugins you need.", "simplybook")}
                        </small>
                    </div>
                </div>
            </RightColumn>
        </>
    )
}