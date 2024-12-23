import React, { useState } from "react";
import * as Picker from "expo-image-picker";
import { Pressable, Text, StyleSheet, View, Image } from "react-native";
import { useRecoilState } from "recoil";
import { atomImageList, atomImageUrl } from "../../utils/Recoil/atoms";
import AWS from "aws-sdk";

const ImagePicker = () => {
  const [uploadButtonPressed, setUploadButtonPressed] = useState(false);
  const [imageList, setImageList] = useRecoilState(atomImageList);
  const [imageUrl, setImageUrl] = useRecoilState(atomImageUrl)
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: process.env.AWS_REGION, 
  });
  const uploadImage = async () => {
    if (!imageUrl) {
      console.log("이미지를 선택해주세요.");
      return;
    }

    try {
      const fileName = imageUrl.split('/').pop(); 
      const fileType = 'image/*'; 

      const params = {
        Bucket: 'hei-test-storage', 
        Key: `uploads/${fileName}`, 
        ContentType: fileType,
      };

      const signedUrl = await s3.getSignedUrlPromise('putObject', params); 

      const file = {
        uri: imageUrl, 
        name: fileName,
        type: fileType,
      };

      const response = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: await fetch(file.uri).then(res => res.blob()),
      });

      if (response.ok) {
        setImageUrl("")
        console.log("파일 업로드 성공");
      } else {
        console.log("파일 업로드 실패", response);
      }
    } catch (error) {
      console.log("업로드 실패", error);
    }
  };
  const setImage = async () => {
    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);  
    }
  };
  console.log(require("../../assets/Ratio_2_3.png"))

  return (
    <View style={styles.container}>
    <Pressable onPress={setImage}>
        <Image
            source={imageUrl ? { uri: imageUrl } : require("../../assets/Ratio_2_3.png")}
            style={[styles.image,{padding:20}]}
            onPress={setImage}
        />
    </Pressable>
    <Pressable
      style={[styles.button, { backgroundColor: uploadButtonPressed ? "#FFECE1" : "#FFBE98" }]}
      onPressIn={() => setUploadButtonPressed(true)}
      onPressOut={() => setUploadButtonPressed(false)}
      onPress={uploadImage}
    >
      <Text style={styles.buttonText}>이미지 업로드</Text>
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%"
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Pretendard",
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default ImagePicker;
