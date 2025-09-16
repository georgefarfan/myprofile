"use client";

import Image from "next/image";
import Link from "next/link";

export type Meta = {
  title: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  cover?: string;
};

export const MDXComponents = {
  a: (props: any) => <Link {...props} />,
  img: (props: any) => (
    <span className="block my-4">
      <Image
        src={props.src}
        alt={props.alt || ""}
        width={1200}
        height={630}
        style={{ height: "auto", width: "100%" }}
      />
    </span>
  ),
};
