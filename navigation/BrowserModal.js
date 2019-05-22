import React, { Component } from "react";
import { View, Icon } from "@shoutem/ui";
import { StyleSheet, WebView } from "react-native";

export default class BrowserModal extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Icon
          name="close"
          style={styles.closeButton}
          onPress={() => navigation.pop()}
        />
        <WebView
          startInLoadingState
          scalesPageToFit
          source={{
            uri: navigation.getParam("uri")
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    alignSelf: "flex-end",
    color: "#000",
    fontSize: 36,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 15,
    padding: 20,
    zIndex: 1000
  }
});
