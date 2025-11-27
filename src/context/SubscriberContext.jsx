import { createContext, useContext, useState, useEffect } from "react";
import {
  getSubscriberList as getSubscribersListApi,
  toggleSubscribe as toggleSubscribeApi,
} from "../services/SubscriberApi";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const SubscriberContext = createContext();

export default function SubscriberProvider({ children }) {
  const { user } = useAuth();

  const [subscribers, setSubscribers] = useState({});
  const [subCount, setSubCount] = useState({});
  const [loading, setLoading] = useState({});

  // Load saved data from localStorage on mount
  useEffect(() => {
    const storedSubscribers = localStorage.getItem("subscribers");
    const storedSubCount = localStorage.getItem("subCount");

    if (storedSubscribers) {
      setSubscribers(JSON.parse(storedSubscribers));
    }
    if (storedSubCount) {
      setSubCount(JSON.parse(storedSubCount));
    }
  }, []);

  // Save subscribers to localStorage
  useEffect(() => {
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
  }, [subscribers]);

  // Save subscriber count to localStorage
  useEffect(() => {
    localStorage.setItem("subCount", JSON.stringify(subCount));
  }, [subCount]);

  // Fetch subscriber list of a channel & update state + localStorage
  const getSubscriberList = async (channelId) => {
    try {
      const res = await getSubscribersListApi(channelId);


      const list = res?.data?.subscribers ?? [];
      const count = res?.data?.count ?? 0;

      // Check if logged-in user is subscribed
      const isSubscribed = list.some((sub) => sub.subscriberId === user?.data?._id);

      // Update subscribe status
      setSubscribers((prev) => ({
        ...prev,
        [String(channelId)]: isSubscribed,
      }));

      // Update count
      setSubCount((prev) => ({
        ...prev,
        [String(channelId)]: count,
      }));
    } catch (err) {
      console.error("getSubscriberList error:", err);
    }
  };

  // Toggle subscribe/unsubscribe + save to localStorage
  const toggleSubscribe = async (channelId) => {
      
      if (!channelId) return;
      if (channelId === user?.data?._id) {
          toast.error("You cannot subscribe to your own channel");
          return;
        }
    setLoading((prev) => ({ ...prev, [channelId]: true }));

    try {
      const res = await toggleSubscribeApi(channelId);
      console.log(res);

      const isSubscribed = res?.data?.subscribed; 
      if (res?.data?.statusCode === 400) {
        toast.error("You cannot subscribe to your own channel");
        return;
      }

      if (isSubscribed === true) {
        toast.success("Subscribed successfully!");
      }

      if (isSubscribed === false) {
        toast.success("Unsubscribed successfully!");
      }
      setSubscribers((prev) => {
        const updated = {
          ...prev,
          [String(channelId)]: isSubscribed,
        };
        localStorage.setItem("subscribers", JSON.stringify(updated));
        return updated;
      });

 
      setSubCount((prev) => {
        const updated = {
          ...prev,
          [String(channelId)]: isSubscribed
            ? (prev[String(channelId)] || 0) + 1
            : (prev[String(channelId)] || 1) - 1,
        };
        localStorage.setItem("subCount", JSON.stringify(updated));
        return updated;
      });

      return isSubscribed;
    } catch (err) {
      console.error("toggleSubscribe error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [channelId]: false }));
    }
  };

  return (
    <SubscriberContext.Provider
      value={{
        subscribers,
        subCount,
        loading,
        getSubscriberList,
        toggleSubscribe,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
}

export const useSubscriber = () => useContext(SubscriberContext);
