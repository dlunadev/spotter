import { StyleSheet, View } from 'react-native';
import GBottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useRef, useEffect, ReactElement, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../text/text.component';
import { Colors } from '@/constants/Colors';

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactElement | ReactElement[];
  title?: string;
  snapPoints?: (string | number)[];
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, setIsOpen, children, title, snapPoints }) => {
  const bottomSheetRef = useRef<GBottomSheet>(null);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (bottomSheetRef.current) {
      if (isOpen) {
        bottomSheetRef.current.expand();
      } else {
        bottomSheetRef.current.close();
      }
    }
  }, [isOpen, setIsOpen]);

  const handleSheetChange = (index: number) => {
    setIsOpen(index > 0);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} pressBehavior="close" enableTouchThrough={false} />
    ),
    []
  );

  return (
    <GBottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 1 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleComponent={() => (
        <View style={styles.handle}>
          {title && <Text weight={600}>{title}</Text>}
          <View style={styles.drag_line} />
        </View>
      )}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      enablePanDownToClose={true}
    >
      <BottomSheetView
        style={{
          backgroundColor: Colors.LIGHT_GRAY,
          zIndex: 99,
          height: '100%'
        }}
      >
        {children}
      </BottomSheetView>
    </GBottomSheet>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  handle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
  },
  drag_line: {
    width: 64,
    height: 3,
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    marginTop: 4,
  },
});

export default styles;
