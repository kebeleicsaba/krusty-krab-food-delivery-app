import { View, Alert } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

export default function App() {
  return (
    <ThemeProvider>
      <View
       style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center'
       }}
      >
       <Button title="Hey!" onPress={() => Alert.alert('Siker!')} />
      </View>
    </ThemeProvider>
  );
}