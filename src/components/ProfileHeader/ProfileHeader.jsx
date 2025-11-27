import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useSubscriber } from "../../context/SubscriberContext";

export default function ProfileHeader({ name, user, channelId }) {
  const [activeTab, setActiveTab] = useState("Videos");
  const [initialized, setInitialized] = useState(false);

  const { subscribers, subCount, getSubscriberList, toggleSubscribe } =
    useSubscriber();
  const isSubscribed = !!subscribers[String(channelId)];

  useEffect(() => {
    if (initialized && channelId) {
      const res = getSubscriberList(channelId);
      console.log(res);
    }
  }, [initialized, channelId]);


  return (
    <div className="w-full   rounded-xl shadow-sm">
      <div className="flex items-center gap-4 ">
        <img src={user.thumbnail} className="w-12 h-12 rounded-full shadow" />
        <div className="flex items-center gap-5">
          <div className="h-fit w-fit ">
            <div className="flex space-y-0  h-fit w-fit gap-1 items-center">
              <span className="h-fit w-fit tracking-tighter text-md font-bold">{name}</span>
              <Check
                size={14}
                className="bg-[#ababab]  rounded-full text-black"
              />
            </div>
            <div>
            <span className="lowercase  space-y-0  text-[14px] text-[#ababab] h-fit w-fit">
              {subCount[String(channelId)] ?? 0} subscribers
            </span>
            </div>
          </div>

          <button
            onClick={() => toggleSubscribe(channelId)}
            className="h-fit w-fit cursor-pointer bg-white hover:bg-white/90 text-black px-3 py-1 rounded-3xl"
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}
