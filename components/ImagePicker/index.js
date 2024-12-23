import React, { useState } from "react";
import * as Picker from "expo-image-picker";
import { Image, Pressable, Text, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import { atomImageUrl } from "../../utils/Recoil/atoms";
import { apiEditor } from "../../utils/api/api";

const ImagePicker = () => {
    const [uploadButtonPressed,setUploadButtonPressed] = useState(false)
    const [imageUrl, setImageUrl] = useRecoilState(atomImageUrl);

    const uploadImage = async () => {
        const result = await Picker.launchImageLibraryAsync({
            mediaTypes: Picker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });

        if (result.canceled) {
            return null
        }
        try {
            const { data } = await apiEditor.getSignedUrl(file.uri.split('/').pop(), file.type);
      
            const uploadResult = await apiEditor.postPresignedUrlUpload(data.url, file);
            console.log(data)
            if (uploadResult.status === 200) {
              console.log("파일 업로드 성공", uploadResult);
            } else {
              console.log("파일 업로드 실패");
            }
          } catch (error) {
            console.log("업로드 실패", error);
          }
        setImageUrl(result.assets[0].uri)
        console.log(imageUrl)
    };

    return (
            <Pressable 
                style={[styles.button, { backgroundColor: uploadButtonPressed ? "#FFECE1" :"#FFBE98"}]} 
                onPressIn={() => setUploadButtonPressed(true)} 
                onPressOut={() => setUploadButtonPressed(false)} 
                onPress={uploadImage}
            >
                <Text style={styles.buttonText}>이미지 업로드</Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width:"100%"
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        width:"90%"
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontFamily:"Pretendard"
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
})

export default ImagePicker
