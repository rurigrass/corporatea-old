import { FC } from "react";
import { Button } from "../ui/Button";

interface FollowUnfollowToggleProps {}

const FollowUnfollowToggle: FC<FollowUnfollowToggleProps> = ({}) => {
  const isFollower = false;

  return isFollower ? (
    <Button className="w-full mt-1 mb-4">Unfollow Company</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Follow Company</Button>
  );
};

export default FollowUnfollowToggle;
