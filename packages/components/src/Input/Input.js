import React, { useState } from 'react';
import { Input as ReactNativeElementsInput } from 'react-native-elements';

export default function Input({
  multiline,
  onLayout,
  onContentSizeChange,
  inputStyle,
  ...rest
}) {
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [height, setHeight] = useState(40);

  const _onLayout = event => {
    const newHeight = event.nativeEvent.layout.height || null;
    if (newHeight) adjustHeight(newHeight);
    if (onLayout) onLayout();
  };

  const _onContentSizeChange = event => {
    const newHeight = event.nativeEvent.contentSize.height || null;
    if (newHeight) adjustHeight(newHeight);
    if (onContentSizeChange) onContentSizeChange();
  };

  const adjustHeight = newHeight => {
    // the height increased therefore we also increase the line counter
    if (height < newHeight) {
      setNumberOfLines(numberOfLines + 1);
    }
    // the height decreased, we subtract a line from the line counter
    if (height > newHeight) {
      setNumberOfLines(numberOfLines - 1);
    }
    setHeight(newHeight);
  };

  return (
    <ReactNativeElementsInput
      {...rest}
      multiline={multiline}
      onLayout={_onLayout}
      onContentSizeChange={_onContentSizeChange}
      numberOfLines={numberOfLines}
      inputStyle={[inputStyle, { lineHeight: 40 }]}
    />
  );
}
