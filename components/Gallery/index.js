import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PhotoGallery } from 'react-native-photos-gallery';
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomImageList } from '../../utils/Recoil/atoms';


const Gallery = () => {
    const [imageList,setImageList] = useRecoilState(atomImageList)
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
        region: process.env.AWS_REGION,
    });
    useEffect(() => {
        const fetchImages = async () => {
          try {
            const params = {
              Bucket: "hei-test-storage",
            };
            const data = await s3.listObjectsV2(params).promise();
            const fetchedImages = data.Contents.map((item) => ({
                url: `https://your-s3-bucket-name.s3.amazonaws.com/${item.Key}`,  
                fileName: item.Key,
                size: item.Size,
                lastModified: item.LastModified,
            }));
            setImageList(fetchedImages);
            // console.log(fetchedImages);
          } catch (error) {
            console.error("이미지 목록 가져오기 실패:", error);
          }
        };
    
        fetchImages();
      }, []);
      const galleryData = imageList.map((image, index) => ({
        id: index,
        source: { uri: image.url }, // image.url을 source.uri로 사용
      }));
    return (
        <SafeAreaView style={styles.screen}>
        <PhotoGallery
            data={galleryData}
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