import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from './components/ImagePicker';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <View style={[styles.container, {flex:9}]}></View>
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
  },
});
