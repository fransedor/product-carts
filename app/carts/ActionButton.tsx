"use client";

import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

const ActionButton = (props: { id: number }) => {
  return (
    <td>
      <Link href={`/carts/${props.id.toString()}`}>
        <FaEye className="mx-auto" />
      </Link>
    </td>
  );
};

export default ActionButton;
