import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface UserTable {
  status: number;
  data: {
    access: string;
    refresh: string;
    uuid: string;
    user_id: number;
    is_superuser: boolean;
  };
}
