import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PhotoGallery } from 'react-native-photos-gallery';
import { useRecoilValue } from 'recoil';
import { atomImageUrl } from '../../utils/Recoil/atoms';

export 

const Gallery = () => {
    const Images = useRecoilValue(atomImageUrl);
    const data = [
        {
        id: 1,
        source: {
            uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        id: 2,
        source: {
            uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
            },
        },
    ];
  return (
    <SafeAreaView style={styles.screen}>
      <PhotoGallery
        data={data}
        onImageExpand={({ visible }) => console.log(visible)}
        animatedImageDelay={60}
        modalBackgroundStyle={styles.modalBackgroundStyle}
      />
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  modalBackgroundStyle: {
    backgroundColor: 'white',
  },
});