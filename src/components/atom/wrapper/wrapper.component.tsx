import { View } from "react-native";
import React, { ReactElement } from "react";
import { useInsets } from "@/hooks";

export default function Wrapper({children, className }: {children: ReactElement | ReactElement[], className?: string}) {
  const { top, bottom } = useInsets();

  return <View style={{ paddingTop: top, paddingBottom: bottom, flex: 1  }} className={`${className} p-6`}>{children}</View>;
}
