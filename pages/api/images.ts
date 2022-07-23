import type { NextApiRequest, NextApiResponse } from "next"
import { OSImage } from "../../types"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<OSImage[]>
) {
  res.status(200).json([
    {
      id: "ubuntu",
      name: "Ubuntu",
      versions: [
        "22.04 (LTS) x64",
        "21.10 x64",
        "20.04 (LTS) x64",
        "18.04 (LTS) x64",
      ],
    },
    {
      id: "rancheros",
      name: "Rancher OS",
      versions: ["1.5.8 x64"],
    },
    {
      id: "fedora",
      name: "Fedora",
      versions: ["36 x64", "35 x64", "34 x64"],
    },
    {
      id: "debian",
      name: "Debian",
      versions: ["11 x64", "10 x64", "9 x64"],
    },
    {
      id: "centos",
      name: "CentOS",
      versions: ["9 Stream x64", "8 Stream x64", "7 x64"],
    },
  ])
}
