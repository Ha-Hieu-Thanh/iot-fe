import { getProfile } from "api/profile";
import { useQuery } from "react-query";

export default function useProfile(enabled = true) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>(
    "profile",
    getProfile,
    { enabled }
  );
  return { profile, refetchProfile };
}
