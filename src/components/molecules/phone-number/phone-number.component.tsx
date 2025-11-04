import { View, StyleSheet, Pressable, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
} from '../../ui/actionsheet';
import { SearchIcon } from '../../ui/icon';
import { Input } from '../../atom/input/input.component';
import { Text } from '../../atom/text/text.component';
import { Colors } from '@/constants/Colors';
import { useCountries } from '@/hooks';

interface InputProps {
  value: string;
  label?: string;
  error?: string;
  onBlur: () => void;
  onChangeText: (text: string) => void;
  placeholder?: string;
  phoneNumber?: string;
  handleChangeCode: (code: string) => void;
}

export const PhoneNumber = (props: InputProps) => {
  const { value, label, error, onBlur, onChangeText: onTextChange, placeholder, phoneNumber, handleChangeCode } = props;
  const { countries } = useCountries();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [countryCodeSelected, setCountryCodeSelected] = useState(phoneNumber);
  const parsedCountries = countries.map((country) => ({
    label: country.name,
    value: country.codeNumber,
    image: country.flag,
    id: country.codeNumber,
  }));

  const handleInputChange = (text: string) => {
    setSearchText(text);
  };

  const filteredData = useCallback(() => {
    return parsedCountries?.filter((item) => item.label.toLowerCase().includes(searchText.toLowerCase()) || item.value.includes(searchText));
  }, [parsedCountries, searchText]);

  const handleClose = (number: string) => {
    setShowActionsheet(false);
    setCountryCodeSelected(number);
    handleChangeCode(number);
    setSearchText('');
  };

  const Item: React.FC<{ title: string; image: string; id: string, subtitle: string }> = useCallback(
    (value) => {
      return (
        <ActionsheetItem
          onPress={() => handleClose(value.id)}
          className="flex-row items-center p-3 rounded-xl mb-1 bg-white shadow-sm active:bg-gray-100"
        >
          <View className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 justify-center items-center mr-3">
            <Image
              source={{ uri: value?.image }}
              className="w-10 h-10"
              resizeMode="cover"
            />
          </View>

        <View className="flex-1">
            <Text
              color={Colors.BLACK}
              className="text-base font-semibold leading-tight"
            >
              {value.title}
            </Text>
            {value.subtitle && (
              <Text
                color="#6B7280"
                className="text-sm font-normal mt-0.5"
              >
                {value.subtitle}
              </Text>
            )}
          </View>
        </ActionsheetItem>
      );
    },
    []
  );

  return (
    <>
      <Input
        label={label}
        placeholder={placeholder}
        error={error}
        leftIcon
        touched={false}
        customIcon={
          <Pressable
            style={styles.custom_icon}
            className="items-center justify-center pr-3"
            onPress={() => setShowActionsheet(true)}
          >
            <Text weight={400}>{countryCodeSelected}</Text>
          </Pressable>
        }
        {...props}
        onBlur={onBlur}
        onChangeText={(text: string) => {
          const numericText = text.replace(/[^0-9]/g, '');
          const limitedText = numericText.slice(0, 10);
          onTextChange(limitedText);
        }}
        value={value}
        maxLength={10}
        keyboardType='phone-pad'
      />
      <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)} snapPoints={[70]} useRNModal>
        <ActionsheetBackdrop />
        <ActionsheetContent className="pb-10 bg-white">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View style={styles.search_bar_container}>
            <Input placeholder="Search..." label="" onBlur={() => {}} onChangeText={handleInputChange} className="" icon={SearchIcon} rightIcon size="sm" />
          </View>
          <ActionsheetFlatList
            data={filteredData()}
            renderItem={({ item }: any) => <Item id={item.id} title={item.value} image={item.image} subtitle={item.label} />}
            contentContainerClassName="gap-4"
            keyExtractor={(item: any) => `${item.id}-${item.label}`}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

const styles = StyleSheet.create({
  search_bar_container: {
    width: '100%',
    marginBottom: 24,
    marginTop: 24,
  },
  custom_icon: {
    height: 40,
    borderEndWidth: 1,
    borderColor: Colors.INPUT,
    minWidth: 40,
  }
});
