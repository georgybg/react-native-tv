import { StyleSheet } from "react-native";
import {
    isAndroid,
    ScreenWidth,
    ScreenHeight,
    isIPhoneXFamily
} from "@freakycoder/react-native-helpers";

export const container = loginButtonBackgroundColor => {
    return {
        marginBottom: 12,
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: loginButtonBackgroundColor
    };
};

export default {
    loginButtonStyle: {
        left: 0,
        right: 0,
        height: 50,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: isAndroid ? 32 : isIPhoneXFamily() ? 32 : ScreenHeight * 0.01,
    },
    forgotButtonStyle: {
        left: 0,
        right: 0,
        height: 50,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: isAndroid ? 62 : isIPhoneXFamily() ? 62 : ScreenHeight * 0.01,
    },
    loginButtonTextStyle: {
        color: "#000",
        fontSize: 15,
        fontFamily: "Montserrat-Bold"
    },
    imagebackgroundStyle: {
        flex: 1,
        zIndex: -1,
        width: ScreenWidth,
        height: ScreenHeight * 0.9,
        ...StyleSheet.absoluteFillObject,
    },
    blackoverlay: {
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: "rgba(0,0,0,0)",
    },
    safeAreaViewStyle: {
        flex: 1
    },
    loginContainer: {
        //marginTop: 24,
    }
};
