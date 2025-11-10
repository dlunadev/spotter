import { View } from "react-native";
import React, { ReactElement } from "react";
import { useInsets } from "@/hooks";
import { Colors } from "@/constants/Colors";

export  function Wrapper({children, className }: {children: ReactElement | ReactElement[], className?: string}) {
  const { top, bottom } = useInsets();

  return <View style={{ paddingTop: top, paddingBottom: bottom + 12, flex: 1, backgroundColor: Colors.WHITE  }} className={`${className} p-6`}>{children}</View>;
}
