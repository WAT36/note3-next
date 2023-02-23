import { Administrator } from "../interfaces/author";

type Props = {
  admin: Administrator;
};

export const Bio = ({ admin }: Props) => {
  return (
    <div className="bio mb-4">
      <p>
        Written by <strong>{admin.name}</strong>{" "}
        {admin.nickname && `( ${admin.nickname} )`}
      </p>
    </div>
  );
};
