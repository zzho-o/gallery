import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from './components/ImagePicker';
import { RecoilRoot } from 'recoil';
import Gallery from './components/Gallery';

export default function App() {
  return (
    <RecoilRoot>
        <Gallery />
      <View style={styles.container}>
        <ImagePicker />
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%"
  },
});
